import React from 'react'
import { getTranslations } from 'next-intl/server'
import MemesList from '@components/MemesList'
import { defaultLocale } from '@i18n/config'
import { getMemes } from '@shared/api/memes'
import { css } from '@styled-system/css'
import { Box, Container, styled } from '@styled-system/jsx'
import { particulesBg } from '@styled-system/patterns'

export async function generateMetadata() {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: t('gallery.metadataTitle'),
    description: t('gallery.metadataDescription'),
    alternates: {
      canonical: '/gallery/'
    }
  }
}

const Page = async () => {
  const t = await getTranslations()
  const memes = await getMemes({ locale: defaultLocale })

  return (
    <Box py={8} bgColor="secondary" className={particulesBg()}>
      <Container maxW={{ lg: '9/12' }}>
        <Box mb={10} textAlign="center">
          <styled.h1 fontSize="xx-large" mb={3} textAlign="center">
            {t('gallery.metadataTitle')}
          </styled.h1>
          <styled.p>
            Plantilles personalitzables dels memes més populars i actuals. Més
            d’un milió de plantilles actualitzades contínuament.
          </styled.p>
        </Box>
        <MemesList
          className={css({
            display: 'grid',
            gridTemplateColumns: {
              lg: 'repeat(4, 1fr)',
              md: 'repeat(3, 1fr)',
              sm: 'repeat(2, 1fr)'
            },
            gap: 5,
            '& li': {
              height: '20vh',
              border: '1px solid rgba(214,214,214,0.28)',
              overflow: 'hidden',
              borderRadius: '3px'
            },
            '& img': {
              height: '100%!important'
            }
          })}
          memes={memes}
        />
      </Container>
    </Box>
  )
}

export default Page
