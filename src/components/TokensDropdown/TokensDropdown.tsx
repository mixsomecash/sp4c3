import React, { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Image, Button, Flex } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { DepositToken } from 'types'
import { depositTokens } from 'data/depositTokens'

type Props = {
  onChange: (token: DepositToken) => void
}

const TokensDropdown = ({ onChange }: Props) => {
  const [selected, setSelected] = useState(depositTokens[0])

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
        {depositTokens.map(token => (
          <MenuItem minH="48px" onClick={() => setSelected(token)}>
            <Image boxSize="1.5rem" src={token.icon} mr={3} />
            <span>{token.symbol}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default TokensDropdown
