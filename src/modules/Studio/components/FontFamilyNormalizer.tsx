'use client'

import React from 'react'
import { getLocalFontFamily } from '@shared/constants/fonts'
import {
  useItemIdSelected,
  useTextboxes
} from '@viclafouch/meme-studio-utilities/hooks'
import type { TextBox } from '@viclafouch/meme-studio-utilities/schemas'

const FontFamilyNormalizer = () => {
  const { textboxes, updateTextbox } = useTextboxes()
  const { setItemIdSelected } = useItemIdSelected()
  const hasInitialized = React.useRef(false)

  React.useEffect(() => {
    const hasUnnormalizedTextboxes = textboxes.some((textbox) => {
      return (
        getLocalFontFamily(textbox.properties.fontFamily) !==
        textbox.properties.fontFamily
      )
    })

    for (const textbox of textboxes) {
      const fontFamily = getLocalFontFamily(textbox.properties.fontFamily)

      if (fontFamily !== textbox.properties.fontFamily) {
        updateTextbox(textbox.id, {
          // The runtime renderer accepts CSS font-family names; the upstream type has not been migrated yet.
          fontFamily: fontFamily as TextBox['properties']['fontFamily']
        })
      }
    }

    const firstTextbox = textboxes[0]

    if (firstTextbox && !hasUnnormalizedTextboxes && !hasInitialized.current) {
      hasInitialized.current = true
      setItemIdSelected(firstTextbox.id, true)
    }
  }, [textboxes, updateTextbox, setItemIdSelected])

  return null
}

export default FontFamilyNormalizer
