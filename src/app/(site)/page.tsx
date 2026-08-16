import React from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@i18n/config'
import HomePage from '../../modules/HomePage'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: { absolute: 'Mems Catalans' },
    description: t('home.metadataDescription'),
    alternates: {
      canonical: '/'
    }
  }
}

const Page = () => {
  return <HomePage locale={defaultLocale} />
}

export default Page
