import { z } from 'zod'
import type { Locale } from '@i18n/locales-constants'
import { disabledMemeIds, featuredMemeIds } from '@shared/constants/catalog'
import {
  type Meme,
  memeSchema
} from '@viclafouch/meme-studio-utilities/schemas'
import memesEn from './memes-with-text-boxes-en.json'

export function getMemes({ locale }: { locale: Locale }) {
  if (locale !== 'ca') {
    throw new Error(`Unsupported runtime locale: ${locale}`)
  }

  const disabledIds = new Set(disabledMemeIds)
  const memes = z.array(memeSchema).parse(memesEn)

  return Promise.resolve(
    memes.filter((meme) => {
      return !disabledIds.has(meme.id)
    })
  )
}

export async function getFeaturedMemes({ locale }: { locale: Locale }) {
  const memes = await getMemes({ locale })
  const memesById = new Map(
    memes.map((meme) => {
      return [meme.id, meme]
    })
  )
  const featuredMemes = featuredMemeIds.flatMap((id) => {
    const meme = memesById.get(id)

    return meme ? [meme] : []
  })
  const featuredIds = new Set(
    featuredMemes.map((meme) => {
      return meme.id
    })
  )
  const fallbackMemes = memes.filter((meme) => {
    return !featuredIds.has(meme.id)
  })

  return [...featuredMemes, ...fallbackMemes].slice(0, 3)
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
