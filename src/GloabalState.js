import React from 'react';
import useSpeakerDataManager from './useSpeakerDataManager';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const {
    isLoading,
    speakerList,
    favoriteClickCount,
    hasErrored,
    error,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
  } = useSpeakerDataManager();

  const provider = {
    isLoading,
    speakerList,
    favoriteClickCount,
    hasErrored,
    error,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
  };

  return (
    <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>
  );
};
