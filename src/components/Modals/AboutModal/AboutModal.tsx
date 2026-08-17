'use client'

import React from 'react'
import AboutCaMDX from '@i18n/locales/ca/md/about.mdx'
import { Container } from '@styled-system/jsx'

const AboutModal: React.FC = () => {
  return (
    <Container>
      <AboutCaMDX />
    </Container>
  )
}

export default AboutModal
