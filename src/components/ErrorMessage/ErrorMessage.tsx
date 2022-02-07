import React from 'react'
import { Box, Text } from '@chakra-ui/react'

type Props = {
  message: string
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <Box w="100%" textAlign="center" my={12}>
      <Text fontWeight="bold">{message}</Text>
    </Box>
  )
}

export default ErrorMessage
