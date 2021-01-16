import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import BookBag from './BookBag';
import BookBagForm from './BookBagForm';

const MobileBookBag = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Book bag</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <BookBag />
      </ModalBody>

      <ModalFooter>
        <BookBagForm onSubmit={onClose} />
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default MobileBookBag;
