import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/theme'
import App from './App'

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID ?? ''
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL ?? ''

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
