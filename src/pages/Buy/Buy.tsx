import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'

const Buy = () => {
  return (
    <Container maxW="500px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        BUY
      </Box>
      <ExchangeCard contractType="buy" />
    </Container>
  )
}

export default Buy
