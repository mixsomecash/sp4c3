import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Center, Spinner, Input, Flex } from '@chakra-ui/react'
import Moralis from 'moralis'
import { useNativeBalance, useERC20Balances } from 'react-moralis'
import { useTokenTradeContract } from 'hooks/useTokenTradeContract'
import { TokensDropdown, PrimaryButton } from 'components'
import { depositTokens } from 'data/depositTokens'
import { useTokenApproval } from 'hooks/useTokenApproval'
import { ContractInfo } from 'types/contract'

type Props = {
  contractInfo: ContractInfo
  type?: 'deposit' | 'withdraw'
}

const ExchangeCard = ({ contractInfo, type }: Props) => {
  const [selectedToken, setSelectedToken] = useState(depositTokens[0])
  const [depositAmount, setDepositAmount] = useState<number | null>(null)
  const [receivableAmount, setReceivableAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: nativeBalance } = useNativeBalance()
  const { data: erc20balances } = useERC20Balances()
  const { tokenRate, rateMultiplier, accountDepositBalance, deposit } = useTokenTradeContract({
    selectedTokenAddress: selectedToken.address,
    contractInfo,
  })
  const { isApproved, approve } = useTokenApproval({
    tokenAddress: selectedToken.address,
    spenderAddress: contractInfo.address,
  })

  const getReceivableAmount = (value: number) => {
    if (!tokenRate || !rateMultiplier) {
      return 0
    }
    return (value * tokenRate) / rateMultiplier
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!tokenRate || !rateMultiplier) {
      return
    }
    const value = parseFloat(event.target.value)

    if (Number.isNaN(value) || value <= 0) {
      setReceivableAmount(0)
      setDepositAmount(value === 0 ? 0 : null)
      return
    }

    setDepositAmount(value)
  }

  const handleConfirm = async () => {
    setErrorMessage(null)
    if (!depositAmount) {
      return
    }
    setIsLoading(true)
    await deposit(depositAmount).catch(ex => {
      setErrorMessage(`${ex.message} ${ex.data?.message ?? ''}`)
    })
    setIsLoading(false)
    setDepositAmount(null)
    setReceivableAmount(0)
  }

  const handleApprove = async () => {
    setIsLoading(true)
    await approve().catch(ex => {
      console.error(ex)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    setReceivableAmount(getReceivableAmount(depositAmount ?? 0))
    // eslint-disable-next-line
  }, [tokenRate, depositAmount])

  const accountTokenBalance =
    selectedToken.address === 'native'
      ? nativeBalance
      : erc20balances?.find(
          balance => balance.token_address.toLowerCase() === selectedToken.address.toLowerCase(),
        )

  return (
    <Box bg="gray.800" py={10} px={14} borderRadius="xl">
      <Box mb={6}>
        <Box my={3}>
          <TokensDropdown
            tokens={depositTokens}
            selected={selectedToken}
            onChange={setSelectedToken}
          />
        </Box>
        <Input
          type="number"
          fontSize="lg"
          fontWeight="bold"
          borderColor="rgba(247,147,30,0.3)"
          textAlign="center"
          placeholder="0.00"
          value={depositAmount !== null ? depositAmount : ''}
          onChange={handleChange}
        />
        <Box mt={2}>
          {accountDepositBalance !== null && (
            <Flex mt={1} alignItems="center" justifyContent="space-between">
              <Box fontSize="sm">Deposited</Box>
              <Box fontSize="lg" fontWeight="bold">
                {accountDepositBalance.toFixed(4)} {selectedToken.symbol}
              </Box>
            </Flex>
          )}
          {accountTokenBalance !== undefined && (
            <Flex mt={1} alignItems="center" justifyContent="space-between">
              <Box fontSize="sm">In wallet</Box>
              <Box fontSize="lg" fontWeight="bold">
                {accountTokenBalance.balance !== undefined
                  ? parseFloat(Moralis.Units.FromWei(accountTokenBalance.balance, 18)).toFixed(4)
                  : '-'}{' '}
                {selectedToken.symbol}
              </Box>
            </Flex>
          )}
        </Box>
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
        {isLoading && (
          <Center>
            <Spinner size="lg" />
          </Center>
        )}
        {!isLoading && isApproved && <PrimaryButton onClick={handleConfirm}>Confirm</PrimaryButton>}
        {!isLoading && !isApproved && (
          <PrimaryButton onClick={handleApprove}>Approve</PrimaryButton>
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
