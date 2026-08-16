import React from 'react'
import type { Metadata } from 'next'
import { notFound, RedirectType } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import CreatePage from 'modules/Studio'
import { defaultLocale } from '@i18n/config'
import { redirect } from '@i18n/navigation'
import { getMeme, getMemes } from '@shared/api/memes'
import { getMemeMetadata } from '@shared/helpers/meme-metadata'
import type { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import {
  getMemeIdFromSlug,
  getMemeSlug
} from '@viclafouch/meme-studio-utilities/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const id = getMemeIdFromSlug(slug)
  const t = await getTranslations({ locale: defaultLocale })

  const { metadata } = await getMemeMetadata(id, defaultLocale)

  return {
    title: metadata.name,
    description: t('createSlug.metadataDescription', { name: metadata.name }),
    keywords: metadata.keywords,
    alternates: {
      canonical: metadata.url,
      languages: {
        ca: metadata.url
      }
    }
  }
}

export async function generateStaticParams() {
  const memes = await getMemes({ locale: defaultLocale })

  return memes.map((meme) => {
    return {
      slug: getMemeSlug(meme)
    }
  })
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params

  const id = getMemeIdFromSlug(slug)

  let meme: Meme

  try {
    meme = await getMeme(id, { locale: defaultLocale })

    const correctSlug = getMemeSlug(meme)

    if (correctSlug !== slug) {
      await redirect(
        {
          locale: defaultLocale,
          href: `/create/${correctSlug}/`
        },
        RedirectType.replace
      )
    }
  } catch (error) {
    notFound()
  }

  return <CreatePage meme={meme} textboxes={meme.textboxes} />
}

export default Page
