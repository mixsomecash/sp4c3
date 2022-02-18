import React, { ReactNode } from 'react'
import { Button } from '@chakra-ui/react'

const PrimaryButton = ({ children, ...rest }: any) => (
  <Button
    w="100%"
    fontSize="lg"
    fontWeight="bold"
    mb={1}
    bg="rgba(247,147,30)"
    textColor="gray.800"
    _hover={{ bg: 'rgba(207,107,0)' }}
    {...rest}
  >
    {children}
  </Button>
)

export default PrimaryButton
