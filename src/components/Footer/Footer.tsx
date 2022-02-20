import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { SocialIcons } from 'components'

const Footer = () => {
  return (
    <Box w="100%" textAlign="center" my={24}>
      <SocialIcons />
      <Box fontWeight="bold">© SP4C3 | Except as noted, content licensed CC-BY 3.0</Box>
    </Box>
  )
}

export default Footer
