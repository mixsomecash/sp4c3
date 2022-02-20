import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import { ContractInfo } from 'types/contract'

type Props = {
  selectedTokenAddress: string
  contractInfo: ContractInfo
}

const PREMIUM_MULTIPLIER = 10000

export const useTokenTradeContract = ({ selectedTokenAddress, contractInfo }: Props) => {
  const { account, isAuthenticated } = useMoralis()
  const [tokenRate, setTokenRate] = useState<number | null>(null)
  const [rateMultiplier, setRateMultiplier] = useState<number | null>(null)
  const [premium, setPremium] = useState<number>(0)
  const [accountDepositedBalance, setAccountDepositedBalance] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetch = async () => {
    if (!rateMultiplier) {
      return
    }
    setIsLoading(true)
    const rate =
      selectedTokenAddress === 'native'
        ? await Moralis.executeFunction({
            functionName: 'nativeRate',
            contractAddress: contractInfo.address,
            abi: contractInfo.abi,
          })
        : await Moralis.executeFunction({
            functionName: 'getRate',
            contractAddress: contractInfo.address,
            abi: contractInfo.abi,
            params: { _token: selectedTokenAddress },
          })
    if (rate) {
      setTokenRate(parseInt(rate as any, 10) / rateMultiplier)
    }
    if (contractInfo.type === 'lend' && account && isAuthenticated) {
      const contractPremium = await Moralis.executeFunction({
        functionName: 'premium',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
      })
      const balance =
        selectedTokenAddress === 'native'
          ? await Moralis.executeFunction({
              functionName: 'getNativeBalance',
              contractAddress: contractInfo.address,
              abi: contractInfo.abi,
              params: { _account: account },
            })
          : await Moralis.executeFunction({
              functionName: 'getBalance',
              contractAddress: contractInfo.address,
              abi: contractInfo.abi,
              params: { _account: account, _token: selectedTokenAddress },
            })
      if (contractPremium && balance) {
        setPremium(parseInt(contractPremium as any, 10) / PREMIUM_MULTIPLIER)
        setAccountDepositedBalance(`${balance}`)
      }
    }
    setIsLoading(false)
  }

  const deposit = async (amount: number) => {
    if (selectedTokenAddress === 'native') {
      const transaction = (await Moralis.executeFunction({
        functionName: 'depositNative',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        msgValue: Moralis.Units.Token(amount),
      })) as any
      await transaction.wait()
    } else {
      const transaction = (await Moralis.executeFunction({
        functionName: 'deposit',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })) as any
      await transaction.wait()
    }
    await fetch()
  }

  const withdraw = async (amount: number) => {
    if (selectedTokenAddress === 'native') {
      const transaction = (await Moralis.executeFunction({
        functionName: 'withdrawNative',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        params: { _amount: Moralis.Units.Token(amount) },
      })) as any
      await transaction.wait()
    } else {
      const transaction = (await Moralis.executeFunction({
        functionName: 'withdraw',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })) as any
      await transaction.wait()
    }
    await fetch()
  }

  useEffect(() => {
    ;(async () => {
      const multiplier = await Moralis.executeFunction({
        functionName: 'rateMultiplier',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
      })
      if (multiplier) {
        setRateMultiplier(parseInt(multiplier as any, 10))
      }
    })()
  }, [contractInfo])

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [selectedTokenAddress, rateMultiplier, account, isAuthenticated])

  return {
    tokenRate,
    rateMultiplier,
    accountDepositedBalance,
    premium,
    isLoading,
    deposit,
    withdraw,
  }
}
