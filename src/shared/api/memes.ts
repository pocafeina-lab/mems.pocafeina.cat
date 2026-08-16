import { z } from 'zod'
import type { Locale } from '@i18n/locales-constants'
import {
  type Meme,
  memeSchema
} from '@viclafouch/meme-studio-utilities/schemas'
import memesEn from './memes-with-text-boxes-en.json'

export function getMemes({ locale }: { locale: Locale }) {
  if (locale !== 'ca') {
    throw new Error(`Unsupported runtime locale: ${locale}`)
  }

  return Promise.resolve(z.array(memeSchema).parse(memesEn))
}

export async function getMeme(
  memeId: Meme['id'],
  { locale }: { locale: Locale }
) {
  const memes = await getMemes({ locale })

  return memes.find((meme) => {
    return meme.id === memeId
  })!
}
