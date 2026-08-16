import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@i18n/config'
import AboutCaMDX from '@i18n/locales/ca/md/about.mdx'
import { Box, Container } from '@styled-system/jsx'

export async function generateMetadata() {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    title: t('about.metadataTitle'),
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
        <Box mt={10}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=viclafouch&repo=meme-studio&type=star&count=true"
            width="90px"
            title="Repositori de GitHub"
            height="20px"
            sandbox="allow-scripts"
          />
          <br />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=viclafouch&type=follow&count=true"
            width="170px"
            height="20px"
            title="Seguidors a GitHub"
            sandbox="allow-scripts"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Page
