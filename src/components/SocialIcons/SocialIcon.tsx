import React from 'react'
import { Link, Flex, Box } from '@chakra-ui/react'

type Props = {
  name: string
  href: string
}

const SocialIcon = ({ name, href }: Props) => {
  return (
    <Box mx={2}>
      <Link href={href} fontSize="2xl">
        <i className={name}></i>
      </Link>
    </Box>
  )
}

export default SocialIcon
