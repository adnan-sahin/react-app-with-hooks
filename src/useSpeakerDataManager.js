import { useReducer, useEffect } from 'react';
import speakersReducer from './speakersReducer';
import axios from 'axios';

function useSpeakerDataManager() {
  const [
    { isLoading, speakerList, favoriteClickCount, hasErrored, error },
    dispatch,
  ] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasErrored: false,
    error: null,
  });

  function incrementFavoriteClickCount() {
    dispatch({ type: 'incrementFavoriteClickCount' });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async function () {
      speakerRec.favorite === true
        ? dispatch({ type: 'unfavorite', id: speakerRec.id })
        : dispatch({ type: 'favorite', id: speakerRec.id });
      console.log('speakerList toggleSpeakerFavorite', speakerList);

      await axios.put(
        `http://localhost:4000/speakers/${speakerRec.id}`,
        speakerRec,
      );
    };

    updateData();
  }

  useEffect(() => {
    // new Promise(function (resolve) {
    //   setTimeout(function () {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   dispatch({
    //     type: 'setSpeakerList',
    //     data: SpeakerData,
    //   });
    // });

    const fetchData = async () => {
      try {
        let result = await axios.get('http://localhost:4000/speakers');
        dispatch({
          type: 'setSpeakerList',
          data: result.data,
        });
        console.log('speakerList', speakerList);
      } catch (e) {
        dispatch({ type: 'errored', error: e });
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);

  debugger;

  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasErrored,
    error,
  };
}

export default useSpeakerDataManager;
