import { useMediaQuery, theme } from '@chakra-ui/react';

theme.breakpoints.base;

const useIsDesktop = () => useMediaQuery('(min-width: 768px)')[0];
const useIsMobile = () => useMediaQuery('(max-width: 768px)')[0];
const useIsSmallMobile = () => useMediaQuery('(max-width: 400px)')[0];

export { useIsMobile, useIsSmallMobile, useIsDesktop };
