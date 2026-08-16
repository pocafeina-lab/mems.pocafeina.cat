import { getRequestConfig } from 'next-intl/server'
import { defaultLocale } from './config'
import caMessages from './locales/ca'

export default getRequestConfig(async () => {
  return {
    messages: caMessages,
    timeZone: 'Europe/Vienna',
    now: new Date(),
    locale: defaultLocale
  }
})
