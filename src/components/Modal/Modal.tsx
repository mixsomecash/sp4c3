import React, { ReactNode } from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react'

const Modal = (props: any) => {
  const { isOpen, onClose, title, children } = props
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} isCentered {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
