import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ExchangeCard } from 'components'
import { contracts } from 'data/contracts'

const Deposit = () => {
  return (
    <Container maxW="450px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        DEPOSIT
      </Box>
      <ExchangeCard contractInfo={contracts.lend} type="deposit" />
    </Container>
  )
}

export default Deposit
