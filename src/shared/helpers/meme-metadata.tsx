import type { Locale } from '@i18n/locales-constants'
import { getMeme } from '@shared/api/memes'
import { baseURL } from '@shared/constants/env'
import { type Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'

type Metadata = {
  name: Meme['name']
  keywords: Meme['keywords']
  slug: ReturnType<typeof getMemeSlug>
  url: string
}

export async function getMemeMetadata(
  id: string,
  locale: Locale
): Promise<{ meme: Meme; metadata: Metadata }> {
  const meme = await getMeme(id, { locale })
  const slug = getMemeSlug({ name: meme.name, id: meme.id })

  const url = new URL(baseURL)
  url.pathname = `/create/${slug}/`

  return {
    meme,
    metadata: {
      name: meme.name,
      keywords: meme.keywords,
      slug,
      url: url.toString()
    }
  }
}
