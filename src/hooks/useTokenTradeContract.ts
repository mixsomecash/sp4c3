import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import buyAbi from 'data/abi/Buy.json'
import lendAbi from 'data/abi/Lend.json'
import { contracts } from 'data/contracts'

type Props = {
  selectedTokenAddress: string
  contractType: 'buy' | 'lend'
}

export const useTokenTradeContract = ({ selectedTokenAddress, contractType }: Props) => {
  const [tokenRate, setTokenRate] = useState<number | null>(null)
  const [rateMultiplier, setRateMultiplier] = useState<number | null>(null)

  const contractAddress = contractType === 'buy' ? contracts.buy.address : contracts.lend.address
  const abi = contractType === 'lend' ? lendAbi : buyAbi

  const fetch = async () => {
    const rate =
      selectedTokenAddress === 'native'
        ? await Moralis.executeFunction({
            functionName: 'nativeRate',
            contractAddress,
            abi,
          })
        : await Moralis.executeFunction({
            functionName: 'rates',
            contractAddress,
            abi,
            params: { '': selectedTokenAddress },
          })
    if (rate) {
      setTokenRate(parseInt(rate as any, 10))
    }
  }

  const deposit = async (amount: number) => {
    if (selectedTokenAddress === 'native') {
      await Moralis.executeFunction({
        functionName: 'depositNative',
        contractAddress,
        abi,
        msgValue: Moralis.Units.Token(amount),
      })
    } else {
      await Moralis.executeFunction({
        functionName: 'deposit',
        contractAddress,
        abi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const multiplier = await Moralis.executeFunction({
        functionName: 'rateMultiplier',
        contractAddress,
        abi,
      })
      if (multiplier) {
        setRateMultiplier(parseInt(multiplier as any, 10))
      }
    })()
  }, [contractAddress, abi])

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [selectedTokenAddress])

  return { tokenRate, rateMultiplier, deposit }
}
