import React, { useEffect } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Image, Button, Flex } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { DepositToken } from 'types'

type Props = {
  tokens: DepositToken[]
  selected: DepositToken
  onChange: (token: DepositToken) => void
}

const TokensDropdown = ({ tokens, selected, onChange }: Props) => {
  useEffect(() => {
    onChange(selected)
    // eslint-disable-next-line
  }, [selected])

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={150}>
        <Flex alignItems="center">
          <Image boxSize="1.5rem" src={selected.icon} mr={3} />
          <span>{selected.symbol}</span>
        </Flex>
      </MenuButton>
      <MenuList>
        {tokens.map(token => (
          <MenuItem key={token.address} minH="48px" onClick={() => onChange(token)}>
            <Image boxSize="1.5rem" src={token.icon} mr={3} />
            <span>{token.symbol}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default TokensDropdown
