import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  theme,
  useTheme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useBookBag } from '../context/bookBag';
import AtSymbolIconSm from './icons/AtSymbolIconSm';
import ClipboardListIconSm from './icons/ClipboardListIconSm';
import UserIconSm from './icons/UserIconSm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDatabase } from '../context/database';
import { RequestBody } from '../pages/api/sendEmail';

const EmailRegExp = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const BookBagForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { books, clearBag } = useBookBag();
  const database = useDatabase();

  const [name, setName] = useLocalStorage<string>('name', '');
  const [email, setEmail] = useLocalStorage<string>('email', '');
  const [additionalInformation, setAdditionalInformation] = useLocalStorage<string>('additionalInformation', '');

  const theme = useTheme();
  const toast = useToast();

  const [requesting, setRequesting] = React.useState(false);

  const handleBookRequest = (event: any) => {
    event.preventDefault();
    const booksWithInformation = books.map((key) => database[key]);

    setRequesting(true);

    const body: RequestBody = { name, email, additionalInformation, books: booksWithInformation };

    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        if (onSubmit) {
          onSubmit();
        }
        clearBag();
        setRequesting(false);
        setAdditionalInformation('');
        toast({
          title:
            books.length === 1
              ? `1 item was requested successfully!`
              : `${books.length} items were requested successfully!`,
          description: `A receipt was sent to ${email}`,
          status: 'success',
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        setRequesting(false);
        toast({
          title: `An unexpected error occurred, please try again.`,
          status: 'error',
          isClosable: true,
        });
      });
  };

  const isEmailValid = EmailRegExp.test(email.trim());
  const isValid = books.length > 0 && name.trim().length > 0 && isEmailValid;

  return (
    <VStack as="form" width="full" mt={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<UserIconSm fill={theme.colors.gray[500]} />} />

        <Input
          type="text"
          placeholder="Full name"
          isRequired
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AtSymbolIconSm fill={theme.colors.gray[500]} />} />

        <Input
          type="email"
          placeholder="Email"
          isRequired
          isInvalid={!isEmailValid}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </InputGroup>

      <Textarea
        placeholder="Additional information"
        value={additionalInformation}
        onChange={(event) => setAdditionalInformation(event.target.value)}
      />

      <Button
        type="submit"
        disabled={requesting || !isValid}
        onClick={handleBookRequest}
        isLoading={requesting}
        width="100%"
        colorScheme="blue"
        leftIcon={<ClipboardListIconSm />}
      >
        <span>Request books</span>
      </Button>
    </VStack>
  );
};

export default BookBagForm;
