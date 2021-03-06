import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'
import { contracts } from 'data/contracts'

const Buy = () => {
  return (
    <Container maxW="450px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        BUY
      </Box>
      <ExchangeCard contractInfo={contracts.buy} />
    </Container>
  )
}

export default Buy
