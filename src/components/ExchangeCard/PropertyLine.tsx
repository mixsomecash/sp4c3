import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

type Props = {
  label: string
  value: any
}

export const PropertyLine = ({ label, value }: Props) => {
  return (
    <Flex mt={1} alignItems="center" justifyContent="space-between">
      <Box fontSize="sm">{label}</Box>
      <Box fontSize="lg" fontWeight="bold">
        {value}
      </Box>
    </Flex>
  )
}
