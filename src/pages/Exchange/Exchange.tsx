import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'

const Exchange = () => {
  return (
    <Container maxW="500px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        EXCHANGE
      </Box>
      <ExchangeCard />
    </Container>
  )
}

export default Exchange
