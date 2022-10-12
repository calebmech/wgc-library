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
    body: '<p>Yes, you are welcome to come into the library on Sundays from 11:30am-12:30pm.</p><p>At other times during the week, please check in with the church office first. You should be able to log onto the library laptop and check out your own items. If not, please leave us a note indicating which item(s) you took home with you.</p>',
  },
  {
    heading: 'When will my library items be ready?',
    body: 'Items requested through the online site will be prepared for pickup once a week (usually on Sunday mornings from 11:30am-12:30pm). You will receive an email to let you know when your items are ready. If you have not received a response within a week, please check your Spam or Junk email folder.',
  },
  {
    heading: 'How will I get my library items?',
    body: 'You can pick them up in the library on Sunday morning, or items can be placed in the mailbox carousel in the church foyer so that you can come into the church during office hours to pick them up.',
  },
  {
    heading: 'How long can I keep my library items?',
    body: 'Keep your items as long as you are making use of them. Just so we don’t lose track, we will send you a reminder if your items have not been returned after 3 weeks, and every week after that. If you know you need an extended loan period, please just let us know when you check the item out so that we don’t bother you unnecessarily.',
  },
  {
    heading: 'How will I return library items?',
    body: 'Place them in the labelled bin in the church library on the lower level. The library is on the opposite side of the kitchen to the gym.',
  },
  {
    heading: 'What if I can’t find the item I’m looking for?',
    body: `There is a place for ‘Additional information’ at the bottom of the ‘Book bag’ section. Please let us know what you are looking for as part of your order or send an email to <a href="mailto:${process
      .env.NEXT_PUBLIC_LIBRARY_EMAIL!}">${process.env
      .NEXT_PUBLIC_LIBRARY_EMAIL!}</a>, and we’ll get back to you as soon as we can.`,
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
