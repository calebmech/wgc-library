import { Box, Button, Heading, IconButton, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useBookBag } from '../context/bookBag';
import { useIsMobile } from '../hooks/useIsMobile';
import FAQ from './FAQ';
import BagIcon from './icons/BagIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';

export default function Header({ bagOpen, setBagOpen }: { bagOpen: boolean; setBagOpen: (open: boolean) => void }) {
  const { books } = useBookBag();
  const isMobile = useIsMobile();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as="header" display="flex" justifyContent="space-between">
      <Box flex="1">
        <Tooltip label="Frequently asked questions">
          <Button leftIcon={<QuestionMarkCircleIcon height={20} />} onClick={onOpen} variant="ghost">
            FAQ
          </Button>
        </Tooltip>
        <FAQ isOpen={isOpen} onClose={onClose} />
      </Box>
      <Heading
        as="h1"
        maxW="calc(min(25%, 127px))"
        margin={2}
        ml={0}
        flex="1"
        filter={useColorModeValue('', 'invert()')}
      >
        <Image src="/logo.png" height="540" width="770" layout="responsive" />
      </Heading>
      <Box display="flex" flex="1" flexDir="column" justifyContent="top" alignItems="flex-end">
        {isMobile && (
          <Box position="relative">
            <IconButton
              aria-label="Book bag"
              className="relative
              "
              onClick={() => setBagOpen(!bagOpen)}
              icon={<BagIcon height="24" />}
              variant="ghost"
            ></IconButton>
            {books.length > 0 && (
              <Box
                w={3}
                h={3}
                background="red.500"
                position="absolute"
                rounded="full"
                top="6px"
                right="6px"
                className="w-3 text-xs h-3 block text-white bg-red-600 absolute rounded-full -top-0.5 -right-0.5"
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
