import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'

type Props = {
  image: string
  header: string
  children: any
}

const ImageListItem = ({ image, header, children }: Props) => {
  return (
    <Flex py={4}>
      <Image src={image} boxSize={100} />
      <Box ml={6}>
        <Box fontSize="xl" fontWeight="bold" mb={3}>
          {header}
        </Box>
        <Box opacity={0.75} fontSize="sm">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default ImageListItem
