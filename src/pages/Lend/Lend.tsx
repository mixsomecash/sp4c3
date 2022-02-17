import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'

const Lend = () => {
  return (
    <Container maxW="500px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        LEND / BORROW
      </Box>
      <ExchangeCard contractType="lend" />
    </Container>
  )
}

export default Lend
