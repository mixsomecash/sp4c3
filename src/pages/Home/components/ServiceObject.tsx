import React from 'react'
import { Box, Image } from '@chakra-ui/react'

type Props = {
  image: string
  text: string
}

const ServiceObject = ({ image, text }: Props) => {
  return (
    <Box p={4} textAlign="center">
      <Image src={image} mx="auto" mb={2} boxSize={100} />
      <Box fontWeight="bold">{text}</Box>
    </Box>
  )
}

export default ServiceObject
