import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Box, Heading, Spinner, Image } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import './index.css'
import { Navbar } from 'components'
import Exchange from 'pages/Exchange'

function App() {
  const { isWeb3Enabled, enableWeb3, web3EnableError, isAuthenticated } = useMoralis()

  useEffect(() => {
    enableWeb3()
    // eslint-disable-next-line
  }, [])

  if (web3EnableError) {
    console.log(web3EnableError)
    return (
      <Box textAlign="center" my={12}>
        <Heading fontSize="2xl" my={3}>
          Failed to enable Web3
        </Heading>
      </Box>
    )
  }

  if (!isWeb3Enabled) {
    return (
      <Box textAlign="center" my={12}>
        <Spinner my={3} size="xl" />
        <Heading fontSize="3xl">Enabling Web3</Heading>
      </Box>
    )
  }

  return (
    <div className="App">
      <Box
        position="absolute"
        backgroundImage="/img/background.svg"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 100%"
        zIndex={-1}
        w="100%"
        h="100%"
      />
      <BrowserRouter>
        <Navbar />
        <Route exact path="/">
          <Exchange />
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App
