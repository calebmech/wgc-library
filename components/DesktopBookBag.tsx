import { Container, Box, Heading } from '@chakra-ui/react';
import React from 'react';
import BookBag from './BookBag';
import BookBagForm from './BookBagForm';

const DesktopBookBag = () => (
  <>
    <Box display="flex" justifyContent="space-between" mb={5}>
      <Heading as="h2" size="md">
        Book bag
      </Heading>
    </Box>
    <BookBag />
    <footer>
      <BookBagForm />
    </footer>
  </>
);

export default DesktopBookBag;
