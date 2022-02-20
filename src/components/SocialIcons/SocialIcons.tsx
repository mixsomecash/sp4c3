import React, { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import SocialIcon from './SocialIcon'

const SocialIcons = () => {
  return (
    <Flex justifyContent="center" py={3}>
      <SocialIcon name="fab fa-github" href="https://github.com/Sp4c3-blockchain/" />
      <SocialIcon name="fab fa-discord" href="https://discord.gg/r3RHU3RVUT" />
      <SocialIcon name="fab fa-reddit-alien" href="https://www.reddit.com/user/Sp4c3_blockchain/" />
      <SocialIcon name="fab fa-twitter" href="https://twitter.com/SP4C3blockchain" />
      <SocialIcon name="fab fa-linkedin-in" href="https://www.linkedin.com/company/sp4c3/" />
    </Flex>
  )
}

export default SocialIcons
