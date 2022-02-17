import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import buyAbi from 'data/abi/Buy.json'

const CONTRACT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export const useBuyContract = () => {
  const [nativeRate, setNativeRate] = useState<number | null>(null)
  const [rateMultiplier, setRateMultiplier] = useState<number | null>(null)

  const fetch = async () => {
    const rate = await Moralis.executeFunction({
      functionName: 'nativeRate',
      contractAddress: CONTRACT_ADDRESS,
      abi: buyAbi,
    })
    const multiplier = await Moralis.executeFunction({
      functionName: 'rateMultiplier',
      contractAddress: CONTRACT_ADDRESS,
      abi: buyAbi,
    })
    if (rate) {
      setNativeRate(parseInt(rate as any, 10))
      setRateMultiplier(parseInt(multiplier as any, 10))
    }
  }

  const depositNative = async (amount: number) => {
    await Moralis.executeFunction({
      functionName: 'depositNative',
      contractAddress: CONTRACT_ADDRESS,
      abi: buyAbi,
      msgValue: Moralis.Units.Token(amount),
    })
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [])

  return { nativeRate, rateMultiplier, depositNative }
}
