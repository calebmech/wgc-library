import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import path from 'path';
import unzipper from 'unzipper';

// Authenticate route
export { getServerSideProps } from '../../auth';

const uploadHandler = multer({
  storage: multer.memoryStorage(),
});

export default nc<NextApiRequest, NextApiResponse>({})
  .use(uploadHandler.single('images'))
  .post(uploadImagesHandler);

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

const s3 = new S3Client({
  region: process.env.IMAGE_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.IMAGE_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.IMAGE_BUCKET_SECRET_ACCESS_KEY!,
  },
});

async function uploadImagesHandler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  if (!req.file) {
    res.statusCode = 400;
    return res.send('No file provided');
  }
  if (req.file.mimetype !== 'application/zip') {
    res.statusCode = 400;
    return res.send('File must be of type zip');
  }
  const dir = await unzipper.Open.buffer(req.file.buffer);

  for await (const file of dir.files) {
    if (file.type != 'File') {
      continue;
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.IMAGE_BUCKET_NAME!,
        Key: path.basename(file.path),
        Body: await file.buffer(),
      })
    );
  }

  res.statusCode = 200;
  return res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
