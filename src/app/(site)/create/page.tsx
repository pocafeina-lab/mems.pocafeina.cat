import React from 'react'
import { getTranslations } from 'next-intl/server'
import CreatePage from 'modules/Studio'
import { defaultLocale } from '@i18n/config'

export async function generateMetadata() {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: 'Crea un mem',
    description: t('create.metadataDescription'),
    alternates: {
      canonical: '/create/'
    }
  }
}

const Page = () => {
  return <CreatePage />
}

export default Page
