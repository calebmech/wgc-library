import Fuse from 'fuse.js';
import type { Volume, Database } from '../types';

const ctx: Worker = self as any;

const options = {
  keys: [
    {
      name: 'volumeInfo.title',
      weight: 1,
    },
    {
      name: 'volumeInfo.authors',
      weight: 0.8,
    },
    {
      name: 'volumeInfo.subtitle',
      weight: 0.7,
    },
    {
      name: 'volumeInfo.categories',
      weight: 0.5,
    },
    {
      name: 'volumeInfo.description',
      weight: 0.3,
    },
  ],
  ignoreLocation: true,
  threshold: 0.4,
};

let database: Database | undefined = undefined;
let fuse: Fuse<Volume> | undefined = undefined;
let volumes: Volume[] = [];

function handleEvent(event: MessageEvent) {
  const isQuery = typeof event.data === 'string';

  if (isQuery && fuse) {
    if (!database) {
      return;
    }

    if (event.data.length === 0) {
      ctx.postMessage(volumes);
    } else {
      const fuseResults = fuse.search(event.data);

      ctx.postMessage(fuseResults.map(({ item }) => item));
    }
  } else if (!database) {
    database = event.data as Database;

    volumes = Object.values(database).filter((volume) => volume?.volumeInfo);

    fuse = new Fuse<Volume>(volumes, options);
  }
}

ctx.addEventListener('message', handleEvent);
