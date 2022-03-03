import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

// Authenticate route
export { getServerSideProps } from '../../auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_NAME!,
    process.env.ALGOLIA_ADMIN_API_KEY!
  );
  const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);

  try {
    await index.replaceAllObjects(req.body);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.end();
  }

  res.statusCode = 200;
  return res.end();
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};
