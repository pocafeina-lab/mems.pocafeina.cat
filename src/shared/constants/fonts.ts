export const localFontFamilyMap: Record<string, string> = {
  Impact: 'Anton',
  'Arial Black': 'Anton',
  Arial: 'Open Sans',
  Helvetica: 'Open Sans',
  'Trebuchet MS': 'Open Sans',
  'Comic Sans MS': 'Comic Neue',
  'Times New Roman': 'Roboto Slab',
  'Andale Mono': 'Roboto Mono'
}

export const localFontFamilyOptions = [
  { value: 'Anton', label: 'Impact' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Comic Neue', label: 'Comic Neue' },
  { value: 'Roboto Slab', label: 'Roboto Slab' },
  { value: 'Roboto Mono', label: 'Roboto Mono' }
] as const

export function getLocalFontFamily(fontFamily: string) {
  return localFontFamilyMap[fontFamily] || fontFamily
}
