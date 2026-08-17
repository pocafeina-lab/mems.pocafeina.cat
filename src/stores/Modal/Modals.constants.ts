import React from 'react'

export const MODALS = {
  export: {
    component: React.lazy(() => {
      return import('@components/Modals/ExportModal')
    })
  },
  about: {
    component: React.lazy(() => {
      return import('@components/Modals/AboutModal')
    })
  },
  gallery: {
    component: React.lazy(() => {
      return import('@components/Modals/GalleryModal')
    })
  }
} as const
