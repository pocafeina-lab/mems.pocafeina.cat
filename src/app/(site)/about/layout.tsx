import React from 'react'
import Footer from '@components/Footer'
import Header from '@components/Header'
import { css } from '@styled-system/css'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className={css({ flex: 1, bg: 'secondary.dark' })}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
