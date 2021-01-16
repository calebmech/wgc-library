import sgMail, { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Book, Volume } from '../../types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export interface RequestBody {
  name: string;
  email: string;
  books: Volume[];
}

function formatBook(book: Book): string {
  return `${book.title}`;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.end();
    return;
  }

  if (typeof req.body !== 'object') {
    res.statusCode = 400;
    res.end();
    return;
  }

  const { books, name, email } = req.body as RequestBody;

  if (
    !Array.isArray(books) ||
    books.length === 0 ||
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof email !== 'string' ||
    email.trim().length === 0
  ) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const msg: MailDataRequired = {
    to: 'cmech1@gmail.com', // Change to your recipient
    replyTo: email,
    from: 'test@example.com', // Change to your verified sender
    subject: `${books.length} book${books.length == 1 ? '' : 's'} have been requested by ${name}`,
    text: `${name} has requested the following books: ${books.join(', ')}`,
  };

  try {
    await sgMail.send(msg);

    res.statusCode = 200;
    res.json({ text: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end();
  }
};
