import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import './index.css'
import { Navbar, Footer, RequireWeb3 } from 'components'
import Buy from 'pages/Buy'
import Deposit from 'pages/Deposit'
import Withdraw from 'pages/Withdraw'
import Home from 'pages/Home'

function App() {
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
        h="800px"
      />
      <BrowserRouter>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/buy">
          <RequireWeb3>
            <Buy />
          </RequireWeb3>
        </Route>
        <Route exact path="/deposit">
          <RequireWeb3>
            <Deposit />
          </RequireWeb3>
        </Route>
        <Route exact path="/withdraw">
          <RequireWeb3>
            <Withdraw />
          </RequireWeb3>
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
