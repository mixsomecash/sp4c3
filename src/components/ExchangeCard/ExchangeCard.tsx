import React, { useState, ChangeEvent } from 'react'
import { Box, Center, Spinner, Input, Flex, Image, Button } from '@chakra-ui/react'
import { useBuyContract } from 'hooks/useBuyContract'
import { TokensDropdown } from 'components'

const ExchangeCard = () => {
  const { nativeRate, rateMultiplier, depositNative } = useBuyContract()
  const [depositAmount, setDepositAmount] = useState<number | null>(null)
  const [receivableAmount, setReceivableAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!nativeRate || !rateMultiplier) {
      return
    }
    const value = parseFloat(event.target.value)

    if (Number.isNaN(value) || value <= 0) {
      setReceivableAmount(0)
      setDepositAmount(value === 0 ? 0 : null)
      return
    }

    setDepositAmount(value)
    setReceivableAmount((value * nativeRate) / rateMultiplier)
  }

  const onConfirm = async () => {
    setErrorMessage(null)
    if (!depositAmount) {
      return
    }
    setIsLoading(true)
    await depositNative(depositAmount).catch(ex => {
      setErrorMessage(`${ex.message} ${ex.data.message}`)
    })
    setIsLoading(false)
    setDepositAmount(null)
    setReceivableAmount(0)
  }

  return (
    <Box bg="gray.800" py={12} px={16} borderRadius="xl">
      <Box mb={6}>
        <Box my={3}>
          <TokensDropdown onChange={() => {}} />
        </Box>
        <Input
          type="number"
          fontSize="lg"
          fontWeight="bold"
          borderColor="rgba(247,147,30,0.3)"
          textAlign="center"
          placeholder="0.00"
          value={depositAmount !== null ? depositAmount : ''}
          onChange={onInputChange}
        />
      </Box>
      <Box mb={6}>
        <Box fontSize="lg" fontWeight="bold" mb={1}>
          SP4C3
        </Box>
        <Box textColor="rgba(247,147,30)" fontSize="3xl" fontWeight="bold" mb={3}>
          {receivableAmount.toFixed(2)}
        </Box>
      </Box>
      <Box>
        {!isLoading ? (
          <Button
            w="100%"
            fontSize="lg"
            fontWeight="bold"
            mb={1}
            bg="rgba(247,147,30)"
            textColor="gray.800"
            _hover={{ bg: 'rgba(207,107,0)' }}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        ) : (
          <Center>
            <Spinner size="lg" />
          </Center>
        )}
      </Box>
      {errorMessage && (
        <Box mt={2} fontSize="sm">
          {errorMessage}
        </Box>
      )}
    </Box>
  )
}

export default ExchangeCard
