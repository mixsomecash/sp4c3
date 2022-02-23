import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'
import { contracts } from 'data/contracts'

const Withdraw = () => {
  return (
    <Container maxW="450px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        PAY BACK
      </Box>
      <ExchangeCard contractInfo={contracts.lend} type="withdraw" />
    </Container>
  )
}

export default Withdraw
