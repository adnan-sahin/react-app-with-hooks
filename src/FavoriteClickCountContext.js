import React, { createContext, useContext, useMemo } from 'react';

import { GlobalContext } from './GloabalState';

export const FavoriteClickCountContext = createContext();

export const FavoriteClickCountProvider = ({ children }) => {
  const { incrementFavoriteClickCount } = useContext(GlobalContext);

  const provider = useMemo(() => {
    return { incrementFavoriteClickCount };
  }, []);

  return (
    <FavoriteClickCountContext.Provider value={provider}>
      {children}
    </FavoriteClickCountContext.Provider>
  );
};
