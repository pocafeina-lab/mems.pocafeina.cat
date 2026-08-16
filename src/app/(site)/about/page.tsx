import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@i18n/config'
import AboutCaMDX from '@i18n/locales/ca/md/about.mdx'
import { Box, Container } from '@styled-system/jsx'

export async function generateMetadata() {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: 'Sobre el projecte',
    description: t('about.metadataDescription'),
    alternates: {
      canonical: '/about/'
    }
  }
}

const Page = () => {
  return (
    <Container maxW="8/12">
      <Box mt={6}>
        <AboutCaMDX />
      </Box>
    </Container>
  )
}

export default Page
