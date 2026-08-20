import { getLocalFontFamily } from '@shared/constants/fonts'
import type { Meme, TextBox } from '@viclafouch/meme-studio-utilities/schemas'

const PADDING_INLINE = 4
const PADDING_BLOCK = 8
const WATERMARK_IMAGE_SRC = '/images/watermark.png'
const WATERMARK_BASE_CANVAS_WIDTH = 600

type Line = {
  value: string
  getHeight: (fontSize: number) => number
}

type LineLayout = {
  line: Line
  offsetY: number
  top: number
  bottom: number
}

export type CanvasTopBlock = {
  isVisible: boolean
  baseHeight: number
}

const getFont = (fontSize: number, fontFamily: string) => {
  return `${fontSize}px "${getLocalFontFamily(fontFamily)}"`
}

export async function waitForTextFonts(textboxes: TextBox[]) {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return
  }

  await Promise.allSettled([
    ...textboxes.map(({ properties }) => {
      return document.fonts.load(
        getFont(16, properties.fontFamily),
        properties.value
      )
    })
  ])
  await document.fonts.ready
}

const getLines = (properties: TextBox['properties']): Line[] => {
  const value = properties.isUppercase
    ? properties.value.toUpperCase()
    : properties.value
  const textLines = value.replaceAll('\r', '').split('\n')

  return textLines.map((textLine, index) => {
    return {
      value: textLine,
      getHeight: (fontSize: number) => {
        return textLines.length > 1 && index !== textLines.length - 1
          ? Math.round(1.2 * fontSize)
          : fontSize
      }
    }
  })
}

const applyFontSizeByWidth = (
  properties: TextBox['properties'],
  lines: Line[],
  context2D: CanvasRenderingContext2D
) => {
  let { fontSize } = properties

  for (const line of lines) {
    context2D.font = getFont(fontSize, properties.fontFamily)

    while (
      fontSize > 1 &&
      context2D.measureText(line.value).width + PADDING_INLINE * 2 >
        properties.width
    ) {
      fontSize -= 1
      context2D.font = getFont(fontSize, properties.fontFamily)
    }
  }

  return fontSize
}

const applyFontSizeByHeight = (
  properties: TextBox['properties'],
  lines: Line[],
  initialFontSize: number
) => {
  let fontSize = initialFontSize

  const getTotalHeight = () => {
    return lines.reduce((totalHeight, line) => {
      return totalHeight + line.getHeight(fontSize)
    }, 0)
  }

  while (
    fontSize > 1 &&
    getTotalHeight() > properties.height - PADDING_BLOCK * 2
  ) {
    fontSize -= 1
  }

  return {
    fontSize,
    linesHeight: getTotalHeight()
  }
}

const getLineLayout = ({
  line,
  offsetY,
  fontSize,
  context2D
}: {
  line: Line
  offsetY: number
  fontSize: number
  context2D: CanvasRenderingContext2D
}): LineLayout => {
  if (line.value.trim().length === 0) {
    return {
      line,
      offsetY,
      top: offsetY,
      bottom: offsetY + line.getHeight(fontSize)
    }
  }

  const metrics = context2D.measureText(line.value)
  const ascent = metrics.actualBoundingBoxAscent
  const descent = metrics.actualBoundingBoxDescent

  if (
    !Number.isFinite(ascent) ||
    !Number.isFinite(descent) ||
    ascent + descent <= 0
  ) {
    return {
      line,
      offsetY,
      top: offsetY,
      bottom: offsetY + line.getHeight(fontSize)
    }
  }

  return {
    line,
    offsetY,
    top: offsetY - ascent,
    bottom: offsetY + descent
  }
}

const getVerticalBounds = (layouts: LineLayout[], linesHeight: number) => {
  const top = Math.min(
    ...layouts.map((layout) => {
      return layout.top
    })
  )
  const bottom = Math.max(
    ...layouts.map((layout) => {
      return layout.bottom
    })
  )

  if (!Number.isFinite(top) || !Number.isFinite(bottom)) {
    return { top: 0, bottom: linesHeight }
  }

  return { top, bottom }
}

let watermarkImagePromise: Promise<HTMLImageElement> | null = null

export const loadWatermarkImage = () => {
  if (!watermarkImagePromise) {
    watermarkImagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()

      image.onload = () => {
        resolve(image)
      }

      image.onerror = () => {
        reject(
          new Error(`Could not load watermark image: ${WATERMARK_IMAGE_SRC}`)
        )
      }

      image.src = WATERMARK_IMAGE_SRC
    })
  }

  return watermarkImagePromise
}

export const drawWatermark = (
  context2D: CanvasRenderingContext2D,
  watermarkImage: HTMLImageElement
) => {
  const scale = context2D.canvas.width / WATERMARK_BASE_CANVAS_WIDTH
  const width = watermarkImage.naturalWidth * scale
  const height = watermarkImage.naturalHeight * scale
  const padding = 6 * scale

  context2D.drawImage(
    watermarkImage,
    context2D.canvas.width - width - padding,
    context2D.canvas.height - height - padding,
    width,
    height
  )
}

export const drawText = (
  textbox: TextBox,
  context2D: CanvasRenderingContext2D
) => {
  const { properties } = textbox
  const lines = getLines(properties)

  context2D.save()
  context2D.fillStyle = properties.color || 'black'
  context2D.textBaseline = 'alphabetic'
  context2D.strokeStyle = 'black'
  context2D.lineJoin = 'round'
  context2D.lineWidth = properties.boxShadow || 1
  context2D.font = getFont(properties.fontSize, properties.fontFamily)

  if (properties.rotate !== 0) {
    context2D.translate(properties.centerX, properties.centerY)
    context2D.rotate((properties.rotate * Math.PI) / 180)
    context2D.translate(-properties.centerX, -properties.centerY)
  }

  const { fontSize, linesHeight } = applyFontSizeByHeight(
    properties,
    lines,
    applyFontSizeByWidth(properties, lines, context2D)
  )
  context2D.font = getFont(fontSize, properties.fontFamily)

  let offsetY = 0
  const layouts = lines.map((line) => {
    const layout = getLineLayout({ line, offsetY, fontSize, context2D })

    offsetY += line.getHeight(fontSize)

    return layout
  })
  const { top, bottom } = getVerticalBounds(layouts, linesHeight)

  let firstLineY: number

  if (properties.alignVertical === 'top') {
    firstLineY =
      properties.centerY - properties.height / 2 + PADDING_BLOCK - top
  } else if (properties.alignVertical === 'middle') {
    firstLineY = properties.centerY - (top + bottom) / 2
  } else {
    firstLineY =
      properties.centerY + properties.height / 2 - PADDING_BLOCK - bottom
  }

  for (const { line, offsetY: lineOffsetY } of layouts) {
    const lineWidth = context2D.measureText(line.value).width
    let lineX: number

    if (properties.textAlign === 'left') {
      lineX = properties.centerX - properties.width / 2 + PADDING_INLINE
    } else if (properties.textAlign === 'center') {
      lineX = properties.centerX - lineWidth / 2
    } else {
      lineX =
        properties.centerX + properties.width / 2 - lineWidth - PADDING_INLINE
    }

    const lineY = firstLineY + lineOffsetY
    context2D.fillText(line.value, lineX, lineY)

    if (properties.boxShadow > 0) {
      context2D.strokeText(line.value, lineX, lineY)
    }
  }

  context2D.restore()
}

export async function exportCanvasBlob({
  meme,
  texts,
  topBlock
}: {
  meme: Meme
  texts: TextBox[]
  topBlock: CanvasTopBlock
}): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = meme.width
  canvas.height = meme.height + (topBlock.isVisible ? topBlock.baseHeight : 0)

  const context2D = canvas.getContext('2d')

  if (!context2D) {
    throw new Error('Could not create export canvas context')
  }

  const imageElement = await new Promise<HTMLImageElement>(
    (resolve, reject) => {
      const image = new Image()

      image.crossOrigin = 'anonymous'

      image.onload = () => {
        resolve(image)
      }

      image.onerror = () => {
        reject(new Error(`Could not load meme image: ${meme.imageUrl}`))
      }

      image.src = meme.imageUrl
    }
  )

  if (topBlock.isVisible) {
    context2D.fillStyle = '#ffffff'

    context2D.fillRect(0, 0, meme.width, topBlock.baseHeight)
    context2D.drawImage(
      imageElement,
      0,
      topBlock.baseHeight,
      meme.width,
      meme.height
    )
  } else {
    context2D.drawImage(imageElement, 0, 0, meme.width, meme.height)
  }

  const watermarkImage = await loadWatermarkImage()

  drawWatermark(context2D, watermarkImage)

  for (const text of texts) {
    drawText(text, context2D)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('toBlob failed'))
      }
    }, 'image/png')
  })
}
