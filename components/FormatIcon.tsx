import React from 'react';
import { ItemType } from '../types';
import BookIconSm from './icons/BookIconSm';
import FilmIconSm from './icons/FilmIconSm';
import MusicNoteIconSm from './icons/MusicNoteIconSm';

export default function TypeIcon({ format, ...props }: { format?: ItemType } & React.SVGAttributes<SVGElement>) {
  switch (format) {
    case ItemType.book:
      return <BookIconSm {...props} />;
    case ItemType.music:
      return <MusicNoteIconSm {...props} />;
    case ItemType.movie:
      return <FilmIconSm {...props} />;
    default:
      return null;
  }
}

export function mapTypeToText(format?: ItemType) {
  switch (format) {
    case ItemType.book:
      return 'Book';
    case ItemType.music:
      return 'CD';
    case ItemType.movie:
      return 'DVD';
    default:
      return null;
  }
}
