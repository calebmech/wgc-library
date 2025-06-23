import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.headers.authorization) {
    context.res.statusCode = 401;
    context.res.setHeader(
      'WWW-Authenticate',
      'Basic realm="Access to update library data", charset="UTF-8"'
    );
    context.res.end();
    return { props: {} };
  }
  const auth = context.req.headers.authorization.split(' ');

  if (auth.length === 2 && auth[0] === 'Basic') {
    const credentials = Buffer.from(auth[1], 'base64').toString().split(':');

    if (credentials.length === 2) {
      const [username, password] = credentials;

      if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
        context.res.statusCode = 200;
        return { props: {} };
      }
    }
  }

  context.res.statusCode = 401;
  context.res.setHeader(
    'WWW-Authenticate',
    'Basic realm="Access to update library data", charset="UTF-8"'
  );
  context.res.end();
  return { props: {} };
};
