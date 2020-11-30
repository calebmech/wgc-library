import useMedia from 'use-media';

const useIsMobile = () => useMedia({ maxWidth: 768 });

export default useIsMobile;