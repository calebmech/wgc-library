import React from 'react';
import type { Database } from '../types';

const DatabaseContext = React.createContext<Database>({});

export default function DatabaseProvider(props: any) {
  const [database, setDatabase] = React.useState({});

  React.useEffect(() => {
    (async () => {
      if (Object.keys(database).length === 0) {
        const databaseRequest = await fetch('/data.json');
        const newDatabase = await databaseRequest.json();
        setDatabase(
          Object.fromEntries(
            Object.entries(newDatabase).filter(([key, value]: any[]) => {
              const isValid = value && value.volumeInfo;
              if (isValid) {
                value.volumeInfo.key = key;
              }
              return isValid;
            })
          )
        );
      }
    })();
  }, []);

  return <DatabaseContext.Provider value={database} {...props} />;
}

export const useDatabase = () => React.useContext(DatabaseContext);
