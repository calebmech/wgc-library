import sgMail, { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapFormatToText } from '../../components/Card';
import { Book, Volume } from '../../types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export interface RequestBody {
  name: string;
  email: string;
  additionalInformation?: string;
  books: Volume[];
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

  const { books, name, email, additionalInformation } = req.body as RequestBody;

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
    text: ` ${books.join(', ')}`,
    html: `
      <p>${name} (${email}) has requested the following books:</p>
      <ul>
        ${books.map((book) => {
          return `<li>${book.volumeInfo.title}</li>`;
        })}
      </ul>
      <h3>Additional information:</h3>
      <p>${additionalInformation}</p>
    `,
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
