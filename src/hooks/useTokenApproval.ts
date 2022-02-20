import { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import tokenAbi from 'data/abi/Erc20Token.json'

type Props = {
  tokenAddress: string
  spenderAddress: string
}

export const useTokenApproval = ({ tokenAddress, spenderAddress }: Props) => {
  const { account, isAuthenticated } = useMoralis()
  const [isApproved, setIsApproved] = useState(false)

  const fetch = async () => {
    if (!account || !isAuthenticated) {
      return
    }
    if (tokenAddress === 'native') {
      setIsApproved(true)
      return
    }
    const allowance = await Moralis.executeFunction({
      functionName: 'allowance',
      contractAddress: tokenAddress,
      abi: tokenAbi,
      params: {
        owner: account,
        spender: spenderAddress,
      },
    })
    setIsApproved(parseInt(allowance as any, 10) > 0)
  }

  const approve = async () => {
    const transaction = (await Moralis.executeFunction({
      functionName: 'approve',
      contractAddress: tokenAddress,
      abi: tokenAbi,
      params: {
        spender: spenderAddress,
        amount: '1157920892373161954235709850086879078',
      },
    })) as any
    await transaction.wait()
  }

  useEffect(() => {
    fetch()
  })

  return { isApproved, approve }
}
