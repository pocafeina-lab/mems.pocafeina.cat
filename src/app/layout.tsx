import type React from 'react'
import type { Metadata } from 'next'
import { Alata } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server'
import QueryProvider from 'queries/QueryProvider'
import ToastContainer from '@components/NotificationProvider'
import { defaultLocale } from '@i18n/config'
import { GoogleAnalytics } from '@next/third-parties/google'
import { baseURL, IS_PROD } from '@shared/constants/env'
import { ModalProvider } from '@stores/Modal/Modal.provider'
import { css, cx } from '@styled-system/css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../../styles/globals.css'

const atlata = Alata({ weight: '400', subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: defaultLocale })

  return {
    metadataBase: new URL(baseURL),
    title: {
      template: 'Meme Studio | %s',
      default: t('common.createMeme')
    }
  }
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  setRequestLocale(defaultLocale)
  const messages = await getMessages()

  return (
    <html lang={defaultLocale}>
      <body
        className={cx(
          atlata.className,
          css({
            minH: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            bg: 'secondary',
            color: 'secondary.textContrast'
          })
        )}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages} locale={defaultLocale}>
            <ToastContainer
              position="bottom-left"
              draggable={false}
              theme="dark"
            />
            <ModalProvider>{children}</ModalProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
      {IS_PROD ? <GoogleAnalytics gaId="G-70NQKBLW0T" /> : null}
    </html>
  )
}

export default RootLayout
