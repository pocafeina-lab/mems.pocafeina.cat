import React from 'react'
import { useTranslations } from 'next-intl'
import {
  getLocalFontFamily,
  localFontFamilyOptions
} from '@shared/constants/fonts'
import { css } from '@styled-system/css'
import { Box } from '@styled-system/jsx'
import {
  ALIGN_VERTICAL,
  TEXT_ALIGN
} from '@viclafouch/meme-studio-utilities/constants'
import { useGlobalInputsRef } from '@viclafouch/meme-studio-utilities/hooks'
import { type TextBox } from '@viclafouch/meme-studio-utilities/schemas'
import { preventEmptyTextValue } from '@viclafouch/meme-studio-utilities/utils'
import { Fieldset } from './TextCustomisation.styles'

export type TextCustomisationProps = {
  textbox: TextBox
  index: number
  onTextKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onUpdateTextProperties: (
    textId: TextBox['id'],
    values: Partial<TextBox['properties']>
  ) => void
}

const TextCustomisation = ({
  textbox,
  index,
  onTextKeyDown,
  onUpdateTextProperties
}: TextCustomisationProps) => {
  const t = useTranslations()

  const { setRef } = useGlobalInputsRef()

  const handleEditText = (key: keyof TextBox['properties']) => {
    return (
      event: React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      let value = event.target.value as string | boolean | number

      if (event.target.getAttribute('type') === 'checkbox') {
        value = (event.target as HTMLInputElement).checked
      } else if (key === 'fontSize' || key === 'boxShadow') {
        value = Number(event.target.value)
      }

      onUpdateTextProperties(textbox.id, {
        [key]: value
      })
    }
  }

  const { properties } = textbox

  const verticalAligns = {
    top: t('common.top'),
    middle: t('common.center'),
    bottom: t('common.bottom')
  } as const satisfies { [key in (typeof ALIGN_VERTICAL)[number]]: string }

  const horizontalAligns = {
    left: t('common.left'),
    center: t('common.center'),
    right: t('common.right')
  } as const satisfies { [key in (typeof TEXT_ALIGN)[number]]: string }

  const selectStyle: React.CSSProperties = {
    color: '#f0f0f0',
    backgroundColor: '#303030'
  }

  const getRangeStyle = (value: number, min: number, max: number) => {
    const progress = ((value - min) / (max - min)) * 100

    return {
      '--range-progress': `${progress}%`
    } as React.CSSProperties
  }

  return (
    <Box>
      <Box p="0.8125rem 0.875rem 1.4375rem 0.875rem">
        <Fieldset>
          <textarea
            className={css({
              w: 'full',
              resize: 'none',
              borderRadius: 'xs',
              padding: '2',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'ButtonHighlight'
            })}
            style={{ fontFamily: getLocalFontFamily(properties.fontFamily) }}
            spellCheck="false"
            onKeyDown={onTextKeyDown}
            onChange={handleEditText('value')}
            value={properties.value}
            rows={5}
            ref={setRef(textbox.id)}
            placeholder={preventEmptyTextValue(
              properties.value,
              index,
              `${t('common.text')} #`
            )}
          />
        </Fieldset>
        <Fieldset>
          <label htmlFor={`font-size-${textbox.id}`}>
            {t('common.fontSize')}
          </label>
          <input
            type="range"
            id={`font-size-${textbox.id}`}
            min="1"
            max="100"
            step="1"
            style={getRangeStyle(Number(properties.fontSize), 1, 100)}
            value={properties.fontSize}
            onChange={handleEditText('fontSize')}
          />
        </Fieldset>
        <Fieldset>
          <label htmlFor={`box-shadow-${textbox.id}`}>
            {t('common.boxShadow')}
          </label>
          <input
            type="range"
            id={`box-shadow-${textbox.id}`}
            min="0"
            max="5"
            step="1"
            style={getRangeStyle(Number(properties.boxShadow), 0, 5)}
            value={properties.boxShadow}
            onChange={handleEditText('boxShadow')}
          />
        </Fieldset>
        <Fieldset>
          <label htmlFor={`color-${textbox.id}`}>{t('common.color')}</label>
          <input
            type="color"
            id={`color-${textbox.id}`}
            value={properties.color}
            onChange={handleEditText('color')}
          />
        </Fieldset>
        <Fieldset>
          <label htmlFor={`font-family-${textbox.id}`}>
            {t('common.fontFamily')}
          </label>
          <select
            id={`font-family-${textbox.id}`}
            style={selectStyle}
            value={getLocalFontFamily(properties.fontFamily)}
            onChange={handleEditText('fontFamily')}
          >
            {localFontFamilyOptions.map((fontOption) => {
              return (
                <option
                  key={fontOption.label}
                  value={fontOption.value}
                  style={{
                    fontFamily: fontOption.value,
                    color: '#f0f0f0',
                    backgroundColor: '#303030'
                  }}
                >
                  {fontOption.label}
                </option>
              )
            })}
          </select>
        </Fieldset>
        <Fieldset>
          <label htmlFor={`align-vertical-${textbox.id}`}>
            {t('common.verticalAlign')}
          </label>
          <select
            id={`align-vertical-${textbox.id}`}
            style={selectStyle}
            value={properties.alignVertical}
            onChange={handleEditText('alignVertical')}
          >
            {ALIGN_VERTICAL.map((alignVertical) => {
              return (
                <option
                  key={alignVertical}
                  value={alignVertical}
                  style={{ color: '#f0f0f0', backgroundColor: '#303030' }}
                >
                  {verticalAligns[alignVertical]}
                </option>
              )
            })}
          </select>
        </Fieldset>
        <Fieldset>
          <label htmlFor={`text-align-${textbox.id}`}>
            {t('common.horizontalAlignment')}
          </label>
          <select
            id={`text-align-${textbox.id}`}
            style={selectStyle}
            value={properties.textAlign}
            onChange={handleEditText('textAlign')}
          >
            {TEXT_ALIGN.map((textAlign) => {
              return (
                <option
                  key={textAlign}
                  value={textAlign}
                  style={{ color: '#f0f0f0', backgroundColor: '#303030' }}
                >
                  {horizontalAligns[textAlign]}
                </option>
              )
            })}
          </select>
        </Fieldset>
        <Fieldset>
          <label htmlFor={`uppercase-${textbox.id}`}>
            {t('common.textInUppercase')}
          </label>
          <input
            type="checkbox"
            onChange={handleEditText('isUppercase')}
            checked={properties.isUppercase}
            id={`uppercase-${textbox.id}`}
          />
        </Fieldset>
      </Box>
    </Box>
  )
}

export default React.memo(TextCustomisation)
