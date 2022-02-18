import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Center, Spinner, Input, Flex } from '@chakra-ui/react'
import Moralis from 'moralis'
import { useNativeBalance, useERC20Balances } from 'react-moralis'
import { useTokenTradeContract } from 'hooks/useTokenTradeContract'
import { TokensDropdown, PrimaryButton } from 'components'
import { depositTokens, primaryToken } from 'data/tokens'
import { useTokenApproval } from 'hooks/useTokenApproval'
import { ContractInfo } from 'types/contract'
import { PropertyLine } from './PropertyLine'

type Props = {
  contractInfo: ContractInfo
  type?: 'deposit' | 'withdraw'
}

const ExchangeCard = ({ contractInfo, type }: Props) => {
  const [selectedToken, setSelectedToken] = useState(depositTokens[0])
  const [depositAmount, setDepositAmount] = useState<number | null>(null)
  const [receivableAmount, setReceivableAmount] = useState<number>(0)
  const [isConfirming, setIsConfirming] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: nativeBalance } = useNativeBalance()
  const { data: erc20balances } = useERC20Balances()
  const { tokenRate, accountDepositedBalance, premium, isLoading, deposit, withdraw } =
    useTokenTradeContract({
      selectedTokenAddress: selectedToken.address,
      contractInfo,
    })
  const { isApproved: isDepositTokenApproved, approve: approveDepositToken } = useTokenApproval({
    tokenAddress: selectedToken.address,
    spenderAddress: contractInfo.address,
  })
  const { isApproved: isPrimaryTokenApproved, approve: approvePrimaryToken } = useTokenApproval({
    tokenAddress: primaryToken.address,
    spenderAddress: contractInfo.address,
  })

  const getReceivableAmount = (value: number) => {
    if (!tokenRate) {
      return 0
    }
    return value * tokenRate
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!tokenRate) {
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
    setIsConfirming(true)
    if (type === 'withdraw') {
      await withdraw(depositAmount).catch(ex => {
        console.error(ex)
        setErrorMessage(`${ex.message} ${ex.data?.message ?? ''}`)
      })
    } else {
      await deposit(depositAmount).catch(ex => {
        console.error(ex)
        setErrorMessage(`${ex.message} ${ex.data?.message ?? ''}`)
      })
    }
    setIsConfirming(false)
    setDepositAmount(null)
    setReceivableAmount(0)
  }

  const handleApprovePrimaryToken = async () => {
    setIsConfirming(true)
    await approvePrimaryToken().catch(ex => {
      console.error(ex)
    })
    setIsConfirming(false)
  }

  const handleApproveDepositToken = async () => {
    setIsConfirming(true)
    await approveDepositToken().catch(ex => {
      console.error(ex)
    })
    setIsConfirming(false)
  }

  useEffect(() => {
    setReceivableAmount(getReceivableAmount(depositAmount ?? 0))
    // eslint-disable-next-line
  }, [tokenRate, depositAmount])

  const accountDepositTokenBalance =
    selectedToken.address === 'native'
      ? nativeBalance.balance
      : erc20balances?.find(
          balance => balance.token_address.toLowerCase() === selectedToken.address.toLowerCase(),
        )?.balance

  const accountPrimaryTokenBalance = erc20balances?.find(
    balance => balance.token_address.toLowerCase() === primaryToken.address.toLowerCase(),
  )?.balance

  const needsApprove =
    (type === 'withdraw' && !isPrimaryTokenApproved) ||
    (type !== 'withdraw' && !isDepositTokenApproved)

  return (
    <Box bg="gray.800" py={10} px={14} borderRadius="xl">
      <Box my={3}>
        <TokensDropdown
          tokens={depositTokens}
          selected={selectedToken}
          onChange={setSelectedToken}
        />
      </Box>
      {!isLoading && (
        <>
          <Box mb={6}>
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
              {accountDepositedBalance !== null && type === 'deposit' && (
                <PropertyLine
                  label="Total + Fees"
                  value={`${((depositAmount ?? 0) * (1 + premium)).toFixed(4)} ${
                    selectedToken.symbol
                  }`}
                />
              )}
              {accountDepositedBalance !== null && (
                <PropertyLine
                  label="Deposited"
                  value={`${parseFloat(Moralis.Units.FromWei(accountDepositedBalance, 18)).toFixed(
                    4,
                  )} ${selectedToken.symbol}`}
                />
              )}
              {accountDepositTokenBalance !== undefined && (
                <PropertyLine
                  label="Balance"
                  value={`${parseFloat(
                    Moralis.Units.FromWei(accountDepositTokenBalance, 18),
                  ).toFixed(4)} ${selectedToken.symbol}`}
                />
              )}
            </Box>
          </Box>
          <Box mb={6}>
            <Box fontSize="lg" fontWeight="bold">
              {primaryToken.symbol}
            </Box>
            <Box textColor="rgba(247,147,30)" fontSize="3xl" fontWeight="bold" mb={1}>
              {receivableAmount.toFixed(2)}
            </Box>
            {accountPrimaryTokenBalance !== undefined && (
              <PropertyLine
                label="Balance"
                value={`${parseFloat(Moralis.Units.FromWei(accountPrimaryTokenBalance, 18)).toFixed(
                  2,
                )} ${primaryToken.symbol}`}
              />
            )}
          </Box>
          <Box>
            {isConfirming && (
              <Center>
                <Spinner size="lg" />
              </Center>
            )}
            {!isConfirming && !needsApprove && (
              <PrimaryButton onClick={handleConfirm}>Confirm</PrimaryButton>
            )}
            {!isConfirming && needsApprove && (
              <PrimaryButton
                onClick={
                  type === 'withdraw' ? handleApprovePrimaryToken : handleApproveDepositToken
                }
              >
                Approve
              </PrimaryButton>
            )}
          </Box>
        </>
      )}
      {isLoading && (
        <Center my={24}>
          <Spinner size="xl" />
        </Center>
      )}
      {errorMessage && (
        <Box mt={2} fontSize="sm">
          {errorMessage}
        </Box>
      )}
    </Box>
  )
}

export default ExchangeCard
