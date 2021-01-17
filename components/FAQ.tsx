import React from 'react';
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const FAQ = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>FAQ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>WIP</Text>
      </ModalBody>

      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default FAQ;
