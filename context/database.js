import React from "react";

const DatabaseContext = React.createContext({});

export default function DatabaseProvider(props) {
  const [database, setDatabase] = React.useState({});

  React.useEffect(async () => {
    if (Object.keys(database).length === 0) {
      const databaseRequest = await fetch("/google-books.json");
      setDatabase(await databaseRequest.json());
    }
  }, []);

  return <DatabaseContext.Provider value={database} {...props} />;
}

export const useDatabase = () => React.useContext(DatabaseContext);
