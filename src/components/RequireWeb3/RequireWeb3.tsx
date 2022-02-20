import React, { useEffect } from 'react'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { chainId as requiredChainId } from 'data/contracts'
import { networkConfigs } from 'data/networks'

type Props = {
  children: any
}

const RequireWeb3 = ({ children }: Props) => {
  const { isWeb3Enabled, enableWeb3, web3EnableError, account, chainId, isAuthenticated } =
    useMoralis()

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3()
    }
    // eslint-disable-next-line
  }, [])

  if (web3EnableError) {
    console.log(web3EnableError)
    return (
      <Box textAlign="center" my={24}>
        <Heading fontSize="2xl" my={3}>
          Failed to enable Web3
        </Heading>
      </Box>
    )
  }

  if (!isWeb3Enabled) {
    return (
      <Box textAlign="center" my={24}>
        <Spinner my={3} size="xl" />
        <Heading fontSize="3xl">Enabling Web3</Heading>
      </Box>
    )
  }

  if (!account || !isAuthenticated) {
    return (
      <Box textAlign="center" my={24}>
        <Heading fontSize="2xl" my={3}>
          Please connect to your wallet
        </Heading>
      </Box>
    )
  }

  if (chainId !== requiredChainId) {
    return (
      <Box textAlign="center" my={24}>
        <Heading fontSize="2xl" my={3}>
          Please switch to {networkConfigs[requiredChainId].chainName} network
        </Heading>
      </Box>
    )
  }

  return children
}

export default RequireWeb3
