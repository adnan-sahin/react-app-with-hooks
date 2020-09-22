import React from 'react';
import Home from './Home';
import Speakers from './Speakers';
import { GlobalProvider } from './GloabalState';
import { FavoriteClickCountProvider } from './FavoriteClickCountContext';

export const ConfigContext = React.createContext();

const pageToShow = (pageName) => {
  if (pageName === 'Home') return <Home />;
  if (pageName === 'Speakers') return <Speakers />;
  return <div>Not Found</div>;
};

const configValue = {
  showSignMeUp: false,
  showSpeakerSpeakinDays: true,
};

const App = ({ pageName }) => {
  return (
    <ConfigContext.Provider value={configValue}>
      <GlobalProvider>
        <FavoriteClickCountProvider>
          <div>{pageToShow(pageName)}</div>
        </FavoriteClickCountProvider>
      </GlobalProvider>
    </ConfigContext.Provider>
  );
};

export default App;
