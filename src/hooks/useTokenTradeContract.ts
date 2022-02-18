import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import { contracts } from 'data/contracts'
import { ContractInfo } from 'types/contract'

type Props = {
  selectedTokenAddress: string
  contractInfo: ContractInfo
}

export const useTokenTradeContract = ({ selectedTokenAddress, contractInfo }: Props) => {
  const { account, isAuthenticated } = useMoralis()
  const [tokenRate, setTokenRate] = useState<number | null>(null)
  const [rateMultiplier, setRateMultiplier] = useState<number | null>(null)
  const [accountDepositBalance, setAccountDepositBalance] = useState<number | null>(null)

  const fetch = async () => {
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
      setTokenRate(parseInt(rate as any, 10))
    }
    if (contractInfo.type === 'lend' && account && isAuthenticated) {
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
      if (balance) {
        setAccountDepositBalance(parseInt(balance as any, 10))
      }
    }
  }

  const deposit = async (amount: number) => {
    if (selectedTokenAddress === 'native') {
      await Moralis.executeFunction({
        functionName: 'depositNative',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        msgValue: Moralis.Units.Token(amount),
      })
    } else {
      await Moralis.executeFunction({
        functionName: 'deposit',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })
    }
  }

  const withdraw = async (amount: number) => {
    if (selectedTokenAddress === 'native') {
      await Moralis.executeFunction({
        functionName: 'withdrawNative',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        msgValue: Moralis.Units.Token(amount),
      })
    } else {
      await Moralis.executeFunction({
        functionName: 'withdraw',
        contractAddress: contractInfo.address,
        abi: contractInfo.abi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })
    }
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
  }, [selectedTokenAddress, account, isAuthenticated])

  return { tokenRate, rateMultiplier, accountDepositBalance, deposit, withdraw }
}
