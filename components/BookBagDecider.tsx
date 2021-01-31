import React from 'react';
import dynamic from 'next/dynamic';
import { useIsDesktop } from '../hooks/useIsMobile';
import { Box, Spinner } from '@chakra-ui/react';

const LazyMobileBookBag = dynamic(() => import('../components/MobileBookBag'), {
  ssr: false,
});

const LazyDesktopBookBag = dynamic(() => import('../components/DesktopBookBag'), {
  loading: () => (
    <Box width="full" textAlign="center">
      <Spinner />
    </Box>
  ),
  ssr: false,
});

const BookBagDecider = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <LazyDesktopBookBag /> : <LazyMobileBookBag isOpen={isOpen} onClose={onClose} />;
};

export default BookBagDecider;
