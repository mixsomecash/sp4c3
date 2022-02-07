import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  target?: string
  onClick?: () => void
}

const NavbarLink = ({ children, target, onClick }: Props) => {
  return (
    <NavLink to={target ?? '#'}>
      <Button px={2} mx={3} bg="transparent" onClick={onClick}>
        {children}
      </Button>
    </NavLink>
  )
}

export default NavbarLink
