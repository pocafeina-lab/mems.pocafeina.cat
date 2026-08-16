import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@i18n/config'
import QaACaMDX from '@i18n/locales/ca/md/qAa.mdx'
import { Box, Container } from '@styled-system/jsx'

export async function generateMetadata() {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: 'Preguntes freqüents',
    description: t('qAq.metadataDescription'),
    alternates: {
      canonical: '/qa/'
    }
  }
}

const Page = () => {
  return (
    <Container maxW="8/12">
      <Box mt={6}>
        <QaACaMDX />
      </Box>
    </Container>
  )
}

export default Page
