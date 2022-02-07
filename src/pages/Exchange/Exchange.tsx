import React from 'react'
import { Box, Container, Input, Flex, Image, Button } from '@chakra-ui/react'

const Exchange = () => {
  return (
    <Container maxW="500px">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" py={16}>
        EXCHANGE
      </Box>
      <Box bg="gray.800" py={12} px={16} borderRadius="xl">
        <Box mb={6}>
          <Flex alignItems="center" mb={3}>
            <Image
              h="28px"
              src="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615"
            />
            <Box fontSize="lg" fontWeight="bold" px={2}>
              BNB
            </Box>
          </Flex>
          <Input
            type="number"
            fontSize="lg"
            fontWeight="bold"
            borderColor="rgba(247,147,30,0.3)"
            textAlign="center"
            placeholder="0.00"
          />
        </Box>
        <Box mb={6}>
          <Box fontSize="lg" fontWeight="bold" mb={1}>
            SP4C3
          </Box>
          <Box textColor="rgba(247,147,30)" fontSize="3xl" fontWeight="bold" mb={3}>
            0.00
          </Box>
        </Box>
        <Box>
          <Button
            w="100%"
            fontSize="lg"
            fontWeight="bold"
            mb={1}
            bg="rgba(247,147,30)"
            textColor="gray.800"
            _hover={{ bg: 'rgba(207,107,0)' }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Exchange
