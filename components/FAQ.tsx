import {
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';

interface FAQItem {
  heading: string;
  body: string;
}

const faqItems: FAQItem[] = [
  {
    heading:
      'Can I just come into the library to find or return items on my own?',
    body: 'At this time, we would appreciate if you request items through this system. We hope to return to self-directed library use as soon as pandemic restrictions are fully lifted.',
  },
  {
    heading: 'When will my library items be ready?',
    body: 'Requested items will be prepared for pickup once a week (usually on Saturdays). You will receive an email to let you know when your items are ready. If you have not received a response within a week, please check your Spam or Junk email folder.',
  },
  {
    heading: 'How will I get my library items?',
    body: '<p>Your items will be placed in a labelled bag in the mailbox carousel in the church foyer, either in your mailbox or in one of the larger slots on the bottom. You will need to come into the church during office hours to pick them up.</p><br /><p>During times when we are able to meet in person for worship services, your items may also be left on your seat in the sanctuary.</p>',
  },
  {
    heading: 'How long can I keep my library items?',
    body: 'Keep your items as long as you are making use of them. Just so we don’t lose track, we will send you a reminder if your items have not been returned after one month, and every 3 weeks after that.',
  },
  {
    heading: 'How will I return library items?',
    body: 'Place them in the labelled bin on the lower level of the church foyer. When we are meeting in person, this will be to your left just as you enter the main front doors.',
  },
  {
    heading: 'What if I can’t find the item I’m looking for?',
    body: `There is a place for ‘Additional information’ at the bottom of the ‘Book bag’ section. Please let us know what you are looking for as part of your order or send an email to <a href="mailto:${process
      .env.NEXT_PUBLIC_LIBRARY_EMAIL!}">${process.env
      .NEXT_PUBLIC_LIBRARY_EMAIL!}</a>, and we’ll get back to you.`,
  },
  {
    heading: 'What precautions are being taken related to the pandemic?',
    body: '<p>When preparing items for pickup, the volunteer will be wearing a mask and cleaning their hands regularly.</p><p>Returned items will be ‘quarantined’ for about a week (at least 3 days) before being recirculated or reshelved.</p>',
  },
  {
    heading: 'What if I have a question not on this list?',
    body: `Please let us know what’s on your mind by sending an email to <a href="mailto:${process
      .env.NEXT_PUBLIC_LIBRARY_EMAIL!}">${process.env
      .NEXT_PUBLIC_LIBRARY_EMAIL!}</a>.`,
  },
];

const FAQ = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Frequently Asked Questions</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
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
