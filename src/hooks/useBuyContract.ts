import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import buyAbi from 'data/abi/Buy.json'

const CONTRACT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export const useBuyContract = ({ selectedTokenAddress }) => {
  const [tokenRate, setTokenRate] = useState<number | null>(null)
  const [rateMultiplier, setRateMultiplier] = useState<number | null>(null)

  const fetch = async () => {
    const rate =
      selectedTokenAddress === 'native'
        ? await Moralis.executeFunction({
            functionName: 'nativeRate',
            contractAddress: CONTRACT_ADDRESS,
            abi: buyAbi,
          })
        : await Moralis.executeFunction({
            functionName: 'rates',
            contractAddress: CONTRACT_ADDRESS,
            abi: buyAbi,
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
        contractAddress: CONTRACT_ADDRESS,
        abi: buyAbi,
        msgValue: Moralis.Units.Token(amount),
      })
    } else {
      await Moralis.executeFunction({
        functionName: 'deposit',
        contractAddress: CONTRACT_ADDRESS,
        abi: buyAbi,
        params: { _depositToken: selectedTokenAddress, _amount: Moralis.Units.Token(amount) },
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const multiplier = await Moralis.executeFunction({
        functionName: 'rateMultiplier',
        contractAddress: CONTRACT_ADDRESS,
        abi: buyAbi,
      })
      if (multiplier) {
        setRateMultiplier(parseInt(multiplier as any, 10))
      }
    })()
  }, [])

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [selectedTokenAddress])

  return { tokenRate, rateMultiplier, deposit }
}
