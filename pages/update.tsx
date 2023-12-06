import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import csv from 'csvtojson';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { assign, Machine } from 'xstate';
import ArrowSmLeft from '../components/icons/ArrowSmLeft';
import CloudUploadIcon from '../components/icons/CloudUploadIcon';
import SearchResultsPreview from '../components/Search/SearchResultsPreview';
import { Category, Group, Item, ItemType } from '../types';

// Authenticate route
export { getServerSideProps } from '../auth';

interface UpdateStateSchema {
  states: {
    initial: {};
    parsing: {};
    parsed: {};
    parsingError: {};
    uploading: {};
    uploadingError: {};
    finished: {};
  };
}

interface UpdateContext {
  database: Item[];
}

type UpdateEvent =
  | { type: 'PARSE_FILE' }
  | { type: 'SUCCESSFUL_PARSE'; database: Item[] }
  | { type: 'START_UPLOAD' }
  | { type: 'SUCCESSFUL_UPLOAD' }
  | { type: 'RESET' };

const invokeUploadDatabase = (context: UpdateContext) => {
  const { database } = context;

  console.log('UPLOADING', database);

  return fetch('/api/updateData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(database),
  });
};

const updateMachine = Machine<UpdateContext, UpdateStateSchema, UpdateEvent>({
  id: 'update',
  initial: 'initial',
  context: {
    database: [],
  },
  on: {
    RESET: {
      target: 'initial',
      actions: [() => assign({ database: [] })],
    },
  },
  states: {
    initial: {
      on: { PARSE_FILE: 'parsing' },
    },
    parsing: {
      on: { SUCCESSFUL_PARSE: 'parsed' },
    },
    parsed: {
      entry: assign({
        database: (_, event) =>
          event.type === 'SUCCESSFUL_PARSE' ? event.database : [],
      }),
      on: {
        START_UPLOAD: 'uploading',
        PARSE_FILE: 'parsing',
      },
    },
    parsingError: {},
    uploading: {
      invoke: {
        id: 'upload-database',
        src: invokeUploadDatabase,
        onDone: 'finished',
        onError: 'uploadingError',
      },
      on: { SUCCESSFUL_UPLOAD: 'finished' },
    },
    uploadingError: {},
    finished: {
      on: { PARSE_FILE: 'parsing' },
    },
  },
});

export default function Update() {
  const toast = useToast();
  const [current, send, service] = useMachine(updateMachine);

  React.useEffect(() => {
    service.onTransition((state) => {
      if (!state.changed) {
        return;
      }

      switch (state.value) {
        case 'finished': {
          toast({
            title: 'Database updated successfully!',
            description: (
              <span>
                <Link href="/">Click here to see the updated site.</Link>
              </span>
            ),
            status: 'success',
          });
        }
      }
    });
  }, [service]);

  const { database } = current.context;

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      return;
    }

    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onloadstart = async () => {
      await send('PARSE_FILE');
    };

    reader.onload = async () => {
      const binaryStr = reader.result;

      if (typeof binaryStr === 'string') {
        const sheet = await csv({
          ignoreEmpty: false,
          delimiter: ['\t'],
          quote: '{',
          escape: '"',
        }).fromString(binaryStr.replaceAll('}', ''));

        const db: Item[] = sheet.map((item: Record<string, string>) => ({
          objectID: item.IDNO,
          ascensionNumber: parseInt(item.BARCODE) || undefined,
          series: item.SERIES,
          deweyDecimal: item.DEWEY,
          category: item.CATEGORY as Category,
          genres: item.SUBJECTS,
          group: item.AUDIENCE as Group,
          creator: item.AUTHOR,
          type: item.TYPE as ItemType,
          isbn: item.ISBN,
          pages: parseInt(item.PAGES) ? parseInt(item.PAGES) : undefined,
          releaseDate: item.PUBLISHED,
          createdDate: item.DATE_ADDED,
          title: item.TITLE,
          synopsis: item.SUMMARY,
          url: item.URL,
          imageUrl: item.IMAGE?.startsWith('http') ? item.IMAGE : undefined,
          amazonID: item.AMAZON_LINK,
          format: item.FORMAT,
          barcode: item.BARCODE,
          kitId: item.KIT_ID,
          highlighted: item.AUDIENCE === Group.ginosPick,
        }));

        send('SUCCESSFUL_PARSE', { database: db });
      }
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex
      background={useColorModeValue('gray.50', 'gray.800')}
      minHeight="100vh"
    >
      <Container as="main" maxWidth="container.sm">
        <Heading as="h1" size="lg" mt="20" mb="6">
          Update WGC Library Website
        </Heading>
        {current.matches('initial') ? (
          <VStack>
            <Box mb="4">
              <Heading as="h2" size="md" mb="2">
                Step 1: Upload CSV
              </Heading>
              <Text>
                Export CSV of database from Delicious Library (making sure all
                fields are included) and upload below
              </Text>
            </Box>
            <Button
              isLoading={current.matches('parsing')}
              loadingText="Parsing data"
              aria-label="Upload database"
              width="full"
              height="32"
              {...getRootProps()}
            >
              <CloudUploadIcon height="40px" />
              <Text ml="2"> {isDragActive ? 'Drop here!' : 'Upload CSV '}</Text>
              <input {...getInputProps()} />
            </Button>
          </VStack>
        ) : current.matches('parsing') ? (
          <Box textAlign="center" my="16">
            <Spinner />
          </Box>
        ) : (
          <VStack spacing="6">
            <Box>
              <Heading as="h2" size="md" mb="2">
                Step 2: Double-check data and upload
              </Heading>
              <Text>
                Make sure newly added items are shown and that all expected
                fields are present (title, cover, description, item type, etc.).
                Then confirm and the changes will be live!
              </Text>
            </Box>
            <Box borderRadius="lg" bg="gray.50">
              <Heading as="h3" size="sm" mb="2">
                Parsed data from CSV ({database.length} items)
              </Heading>
              <Divider mb="5" />
              {database.length > 0 && (
                <SearchResultsPreview results={database} maxH="400px" />
              )}
            </Box>
            <Divider />
            <HStack spacing="3" justify="end" width="full">
              <Button
                disabled={current.matches('uploading')}
                onClick={() => {
                  send('RESET');
                }}
                leftIcon={<Icon as={ArrowSmLeft} />}
              >
                Try again
              </Button>
              <Button
                isLoading={current.matches('uploading')}
                loadingText="Uploading"
                disabled={!current.matches('parsed')}
                onClick={() => send('START_UPLOAD')}
                colorScheme="blue"
              >
                Looks good, go live!
              </Button>
            </HStack>
          </VStack>
        )}
      </Container>
    </Flex>
  );
}
