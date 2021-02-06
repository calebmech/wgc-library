import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import { useIsDesktop } from '../../hooks/useIsMobile';
import BookBagForm from './BookBagForm';

const LazyMobileBookBag = dynamic(() => import('./MobileBookBag'), {
  ssr: false,
});

const LazyDesktopBookBag = dynamic(() => import('./DesktopBookBag'), {
  ssr: false,
});

const BookBagContainer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const isDesktop = useIsDesktop();
  return (
    <Container
      role="complementary"
      className="desktop-display-only"
      width="33vw"
      minWidth="350px"
      mx={0}
      p={7}
      background={useColorModeValue('white', 'gray.900')}
      top="0"
      position="sticky"
      display="flex"
      flexDirection="column"
      height="100vh"
      borderLeftWidth="1px"
      justifyContent="space-between"
    >
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Heading as="h2" size="md">
          Book bag
        </Heading>
      </Box>
      {isDesktop ? <LazyDesktopBookBag /> : <LazyMobileBookBag isOpen={isOpen} onClose={onClose} />}
      <Box as="footer" mt={4}>
        <BookBagForm />
      </Box>
    </Container>
  );
};

export default BookBagContainer;
