export const IS_PROD = process.env.NODE_ENV === 'production'

export const baseURL = IS_PROD
  ? 'https://mems.pocafeina.cat'
  : 'http://localhost:8080'
