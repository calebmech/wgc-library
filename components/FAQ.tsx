import React from 'react';
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

interface FAQItem {
  heading: string;
  body: string;
}

const faqItems: FAQItem[] = [
  {
    heading: 'Can I just come into the library to find or return items on my own?',
    body:
      'At this time, we would appreciate if you request items through this system. We hope to return to self-directed library use as soon as pandemic restrictions are fully lifted.',
  },
  {
    heading: 'When will my library items be ready?',
    body:
      'Requested items will be prepared for pickup once a week (usually on Saturdays). You will receive an email to let you know when your items are ready.',
  },
  {
    heading: 'How will I get my library items?',
    body:
      '<p>Your items will be placed in your mailbox in the church foyer, or in a labelled bag in the foyer. You will need to come into the church during office hours to pick them up.</p><p>During times when we are able to meet in person for worship services, your items will generally be left on your seat in the sanctuary.</p>',
  },
  {
    heading: 'How will I return library items?',
    body: 'There will be a labelled cart on the lower level of the church foyer for returns.',
  },
  {
    heading: 'What if I can’t find the item I’m looking for?',
    body:
      'There is a place for ‘Additional information’ at the bottom of the ‘Book bag’ section. Please let us know what you are looking for as part of your order or send an email to <a href="mailto:library@winonagospelchurch.org">library@winonagospelchurch.org</a>, and we’ll get back to you.',
  },
  {
    heading: 'How long can I keep my library items?',
    body:
      'Keep your items as long as you are making use of them. Just so we don’t lose track, we will plan to send you are reminder if your items have not been returned after one month.',
  },
  {
    heading: 'What if I have a question not on this list?',
    body:
      'Please let us know what’s on your mind by sending an email to <a href="mailto:library@winonagospelchurch.org">library@winonagospelchurch.org</a>.',
  },
];

const FAQ = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Frequently Asked Questions</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb="4" textAlign="center" color="red.600">
          ALL OF THE FOLLOWING RESPONSES ARE JUST INITIAL SUGGESTIONS AND NEED TO BE CLARIFIED/CONFIRMED AND SHOULD BE
          REVISED BEFORE THE WEBSITE GOES LIVE.
        </Text>

        <UnorderedList>
          {faqItems.map(({ heading, body }) => (
            <ListItem mb={4} key={heading}>
              <Heading as="h2" size="sm" mb={2}>
                {heading}
              </Heading>
              <Text dangerouslySetInnerHTML={{ __html: body }} />
            </ListItem>
          ))}
        </UnorderedList>
      </ModalBody>

      <ModalFooter />
    </ModalContent>
  </Modal>
);

export default FAQ;
