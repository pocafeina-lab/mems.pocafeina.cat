'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Button from '@components/Button'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLocalFontFamily } from '@shared/constants/fonts'
import { exportCanvasBlob, waitForTextFonts } from '@shared/helpers/canvas'
import { useNotifications } from '@shared/hooks/useNotifications'
import { useShowModal } from '@stores/Modal/Modal.provider'
import { useMutation } from '@tanstack/react-query'
import {
  useMeme,
  useRatiotedTextboxes,
  useTopBlock
} from '@viclafouch/meme-studio-utilities/hooks'
import type { Meme, TextBox } from '@viclafouch/meme-studio-utilities/schemas'

const ExportButton = () => {
  const meme = useMeme()
  const t = useTranslations()
  const showModal = useShowModal()
  const topBlock = useTopBlock()
  const { notifyError } = useNotifications()
  const getScaledTextsByMemeSize = useRatiotedTextboxes()

  const exportCanvasMutation = useMutation({
    mutationFn: async (body: { meme: Meme }) => {
      const texts = getScaledTextsByMemeSize().map((text) => {
        return {
          ...text,
          properties: {
            ...text.properties,
            fontFamily: getLocalFontFamily(
              text.properties.fontFamily
            ) as TextBox['properties']['fontFamily']
          }
        }
      })

      await waitForTextFonts(texts)

      return exportCanvasBlob({
        meme: body.meme,
        topBlock,
        texts
      })
    },
    onError: () => {
      notifyError()
    },
    onSuccess: (blob: Blob, variables) => {
      showModal('export', {
        canvasBlob: blob,
        width: variables.meme.width,
        height:
          variables.meme.height + (topBlock.isVisible ? topBlock.baseHeight : 0)
      })
    }
  })

  const handleOpenExportModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    if (!meme) {
      return
    }

    exportCanvasMutation.mutate({
      meme
    })
  }

  return (
    <Button
      disabled={!meme}
      color="export"
      rounded
      onClick={handleOpenExportModal}
      startAdornment={<FontAwesomeIcon icon={faArrowCircleDown} />}
    >
      {t('tools.exportMeme').toUpperCase()}
    </Button>
  )
}

export default ExportButton
