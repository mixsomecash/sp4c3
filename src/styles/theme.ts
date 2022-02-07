import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: {
        background: 'gray.900',
      },
      body: {
        background: 'transparent',
      },
      a: {
        fontWeight: 'bold',
      },
    },
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
})
