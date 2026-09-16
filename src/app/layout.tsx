import type React from 'react'
import type { Metadata } from 'next'
import { Alata } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import QueryProvider from 'queries/QueryProvider'
import ToastContainer from '@components/NotificationProvider'
import { defaultLocale } from '@i18n/config'
import { baseURL } from '@shared/constants/env'
import { ModalProvider } from '@stores/Modal/Modal.provider'
import { css, cx } from '@styled-system/css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../../styles/globals.css'

const atlata = Alata({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    template: '%s | Mems Catalans',
    default: 'Mems Catalans'
  },
  description:
    'Afegeix textos personalitzables a plantilles o imatges pròpies i crea mems en català.',
  openGraph: {
    title: 'Mems Catalans',
    description:
      'Afegeix textos personalitzables a plantilles o imatges pròpies i crea mems en català.',
    siteName: 'Mems Catalans',
    locale: 'ca_ES',
    type: 'website',
    images: [
      {
        url: '/images/og-card.png',
        width: 1730,
        height: 909,
        type: 'image/png',
        alt: 'Generador de mems 2.0 de Mems Catalans, per Pocafeina.cat'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mems Catalans',
    description:
      'Afegeix textos personalitzables a plantilles o imatges pròpies i crea mems en català.',
    images: [
      {
        url: '/images/og-card.png',
        alt: 'Generador de mems 2.0 de Mems Catalans, per Pocafeina.cat'
      }
    ]
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
    </html>
  )
}

export default RootLayout
