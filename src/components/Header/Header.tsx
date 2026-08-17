import React from 'react'
import Image from 'next/image'
import { Link } from '@i18n/navigation'
import { Box, Flex, Grid } from '@styled-system/jsx'

export type HeaderProps = {
  actions?: React.ReactNode
}

const Header = ({ actions = null }: HeaderProps) => {
  return (
    <Grid
      height="5rem"
      width="full"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bgColor="primary.dark"
      zIndex={999}
      paddingInline="12"
      boxShadow="md"
      gridTemplateColumns="1fr auto 1fr"
    >
      <Box />
      <Box py="1.5">
        <Link href="/">
          <Image
            alt="Logotip de Mems Catalans"
            width={250}
            height={66}
            priority
            src="/images/logo-pocafeina.png"
          />
        </Link>
      </Box>
      <Flex
        align="center"
        justify="flex-end"
        gap={5}
        display={{ mdDown: 'none', md: 'flex' }}
      >
        {actions}
      </Flex>
    </Grid>
  )
}

export default Header
