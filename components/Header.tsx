import { Box, Button, Heading, IconButton, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useBookBag } from '../context/BookBagContext';
import FAQ from './FAQ';
import BagIcon from './icons/BagIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';

export default function Header({ bagOpen, setBagOpen }: { bagOpen: boolean; setBagOpen: (open: boolean) => void }) {
  const { books } = useBookBag();
  const { isOpen: faqOpen, onClose: onFAQClose, onOpen: setFAQOpen } = useDisclosure();

  return (
    <Box as="header" display="flex" justifyContent="space-between">
      <Box flex="1">
        <Tooltip label="Frequently asked questions">
          <Button leftIcon={<QuestionMarkCircleIcon height={20} />} onClick={setFAQOpen} variant="ghost">
            FAQ
          </Button>
        </Tooltip>
        <FAQ isOpen={faqOpen} onClose={onFAQClose} />
      </Box>

      <Heading
        flex="1"
        as="h1"
        maxW="calc(min(25%, 127px))"
        margin={2}
        ml={0}
        filter={useColorModeValue('', 'invert()')}
      >
        <Image
          src="/logo.png"
          height="89"
          width="127"
          layout="intrinsic"
          alt="Winona Gospel Church logo"
          loading="eager"
        />
      </Heading>

      <Box flex="1" display="flex" flexDir="column" justifyContent="top" alignItems="flex-end">
        <Box position="relative" className="mobile-display-only">
          <IconButton
            aria-label="Book bag"
            className="relative"
            onClick={() => setBagOpen(!bagOpen)}
            icon={<BagIcon height="24" />}
            variant="ghost"
          ></IconButton>
          {books.length > 0 && (
            <Box w={3} h={3} background="red.500" position="absolute" rounded="full" top="6px" right="6px" />
          )}
        </Box>
      </Box>
    </Box>
  );
}
