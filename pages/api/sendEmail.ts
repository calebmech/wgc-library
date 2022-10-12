import sgMail, { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Categories, Item } from '../../types';

const libraryEmail = process.env.NEXT_PUBLIC_LIBRARY_EMAIL!;

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export interface RequestBody {
  name: string;
  email: string;
  additionalInformation?: string;
  books: Item[];
}

function ifThenReturn(check: boolean, value: string) {
  if (check) {
    return value;
  }

  return '';
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

  const requesterMsg: MailDataRequired = {
    to: { name, email },
    from: {
      email: libraryEmail,
      name: 'Winona Gospel Church Library',
    },
    subject: `Your request of ${books.length} item${
      books.length == 1 ? '' : 's'
    } has been received!`,
    html: `
      <p>Thank you for using the Winona Gospel Church library website!</p>      

      <p>You requested the following item${books.length == 1 ? '' : 's'}:</p>

      <ul>
        ${books
          .map((item) => {
            const { title, creator } = item;

            return `
            <li>
              ${title} ${ifThenReturn(!!creator, `(${creator})`)}
            </li>
          `;
          })
          .join('\n')}
      </ul>
      ${ifThenReturn(
        !!additionalInformation && additionalInformation.trim().length > 0,
        `<h3>Additional information:</h3>
        <blockquote>${additionalInformation}</blockquote>`
      )}

      <p>You should receive an email within a week to confirm your items are ready for pickup. If you haven’t heard from us in that time, please leave a message at the church office (905-643-3116, or ${libraryEmail}).</p>
    `,
  };

  const libraryMsg: MailDataRequired = {
    to: {
      name: 'Winona Gospel Church Library',
      email: libraryEmail,
    },
    replyTo: email,
    from: {
      email: libraryEmail,
      name: 'Library Website',
    },
    subject: `${name} has requested ${books.length} item${
      books.length == 1 ? '' : 's'
    }`,
    html: `
      <p>${name} (${email}) has requested the following item${
      books.length == 1 ? '' : 's'
    }:</p>
      <ul>
        ${books
          .map((item) => {
            const { title, creator } = item;

            return `
            <li>
              ${title} ${ifThenReturn(!!creator, `(${creator})`)}

              <ul>
                <li>Audience: ${item.group}</li>
                <li>Category: ${
                  item.category ? Categories[item.category] : 'Unknown'
                }</li>
                <li>Dewey: ${item.deweyDecimal ?? 'Unknown'}</li>
                <li>Type: ${item.type ?? 'Unknown'}</li>
                <li>Format: ${item.format ?? 'Unknown'}</li>
                <li>Barcode: ${item.barcode ?? 'Unknown'}</li>
                <li>Kit #: ${item.kitId ?? 'None'}</li>
              </ul>
            </li>
          `;
          })
          .join('\n')}
      </ul>
      ${ifThenReturn(
        !!additionalInformation && additionalInformation.trim().length > 0,
        `<h3>Additional information:</h3>
        <blockquote>${additionalInformation}</blockquote>`
      )}
    `,
  };

  try {
    await sgMail.send(libraryMsg);
    await sgMail.send(requesterMsg);

    res.statusCode = 200;
    res.json({ text: 'Emails sent' });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end();
  }
};
