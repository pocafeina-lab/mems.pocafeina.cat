import type { MetadataRoute } from 'next'
import { defaultLocale } from '@i18n/config'
import { getMemes } from '@shared/api/memes'
import { baseURL } from '@shared/constants/env'
import { getMemeSlug } from '@viclafouch/meme-studio-utilities/utils'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const memes = await getMemes({ locale: defaultLocale })
  const staticPaths = ['/', '/create/', '/gallery/', '/about/']
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((pathname) => {
    const url = new URL(baseURL)
    url.pathname = pathname

    return {
      url: url.toString(),
      lastModified
    }
  })

  const memeRoutes: MetadataRoute.Sitemap = memes.map((meme) => {
    const url = new URL(baseURL)

    url.pathname = `/create/${getMemeSlug(meme)}/`

    return {
      url: url.toString(),
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7
    }
  })

  return [...staticRoutes, ...memeRoutes]
}
