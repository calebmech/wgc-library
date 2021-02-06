import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
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

      <ModalFooter
        position="relative"
        _before={{
          display: 'block',
          content: '""',
          width: '100%',
          height: 30,
          position: 'absolute',
          top: -30,
          left: 0,
          backgroundImage: `linear-gradient(to top, ${useColorModeValue(
            'rgba(255, 255, 255, 1)',
            'rgba(45, 55, 72, 1)'
          )}, ${useColorModeValue('rgba(255, 255, 255, 0)', 'rgba(45, 55, 72, 0)')} )`,
        }}
      >
        <BookBagForm onSubmit={onClose} />
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default MobileBookBag;
