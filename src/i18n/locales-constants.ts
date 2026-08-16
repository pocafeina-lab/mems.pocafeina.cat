export const locales = {
  ca: 'ca'
} as const

export type Locale = (typeof locales)[keyof typeof locales]
