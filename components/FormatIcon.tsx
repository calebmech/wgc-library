import { Icon } from '@chakra-ui/react';
import React from 'react';
import { Kind } from '../types';
import BookIconSm from './icons/BookIconSm';
import FilmIconSm from './icons/FilmIconSm';
import MusicNoteIconSm from './icons/MusicNoteIconSm';

export default function FormatIcon({ format, ...props }: { format?: Kind }) {
  switch (format) {
    case Kind.BooksVolume:
      return <Icon as={BookIconSm} {...props} />;
    case Kind.CD:
      return <Icon as={MusicNoteIconSm} {...props} />;
    case Kind.DVD:
      return <Icon as={FilmIconSm} {...props} />;
    default:
      return null;
  }
}

export function mapFormatToText(format?: Kind) {
  switch (format) {
    case Kind.BooksVolume:
      return 'Book';
    case Kind.CD:
      return 'CD';
    case Kind.DVD:
      return 'DVD';
    default:
      return null;
  }
}
