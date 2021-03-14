import { useMediaQuery } from '@chakra-ui/react';

const useIsDesktop = () => useMediaQuery('(min-width: 768px)')[0];
const useIsMobile = () => useMediaQuery('(max-width: 768px)')[0];

export { useIsMobile, useIsDesktop };
