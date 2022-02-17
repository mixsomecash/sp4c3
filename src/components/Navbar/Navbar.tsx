import React from 'react'
import { Box, Flex, IconButton, Image, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useMoralis } from 'react-moralis'
import { getEllipsisText } from 'utils/formatters'
import NavbarLink from './NavbarLink'

const Navbar = () => {
  const { account, isAuthenticated, authenticate, logout, enableWeb3 } = useMoralis()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const disconnect = () => {
    logout()
    enableWeb3()
  }

  return (
    <Box px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box>
          <Image src="/img/logo.png" h="40px" />
        </Box>
        <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
          {account && isAuthenticated ? (
            <Flex>
              <Box py={2}>{getEllipsisText(account)}</Box>
              <NavbarLink onClick={disconnect}>Disconnect</NavbarLink>
            </Flex>
          ) : (
            <NavbarLink onClick={authenticate}>Connect To Wallet</NavbarLink>
          )}
          <NavbarLink target="/">Main</NavbarLink>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} textAlign="center">
          Mobile functions are not supported yet
        </Box>
      ) : null}
    </Box>
  )
}

export default Navbar
