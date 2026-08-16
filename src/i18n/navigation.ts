import type React from 'react'
import { createNavigation } from 'next-intl/navigation'
import { defaultLocale } from './config'

const locales = [defaultLocale] as const

const navigation = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'never'
})

export const { Link, redirect, usePathname, useRouter } = navigation

export type LinkProps = React.ComponentProps<typeof Link>
