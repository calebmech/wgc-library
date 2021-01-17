import { Box, Button, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { useBookBag } from '../context/bookBag';
import { useIsMobile } from '../hooks/useIsMobile';
import BagIcon from './icons/BagIcon';
import Image from 'next/image';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import React from 'react';
import FAQ from './FAQ';

export default function Header({ bagOpen, setBagOpen }: { bagOpen: boolean; setBagOpen: (open: boolean) => void }) {
  const { books } = useBookBag();
  const isMobile = useIsMobile();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box as="header" display="flex" justifyContent="space-between">
      <Box flex="1">
        <Button leftIcon={<QuestionMarkCircleIcon height={20} />} onClick={onOpen} variant="ghost">
          FAQ
        </Button>
        {/* <IconButton variant="ghost" aria-label="FAQ" icon={<QuestionMarkCircleIcon />} onClick={onOpen} /> */}
        <FAQ isOpen={isOpen} onClose={onClose} />
      </Box>
      <Heading as="h1" maxW="44" margin="auto" flex="1">
        <Image src="/logo.png" height="258" width="452" layout="responsive" />
        {/* WGC Library */}
      </Heading>
      <Box display="flex" flex="1" flexDir="column" justifyContent="top" alignItems="flex-end">
        {isMobile && (
          <Box position="relative">
            <IconButton
              aria-label="Book bag"
              className="relative"
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
