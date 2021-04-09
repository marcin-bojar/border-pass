import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// import Loader from '../loader/loader.component';

import { getConfig } from '../../utils';
import { AppContext } from '../../hooks/useAppState';

import './archive.styles.scss';

const Archive = () => {
  const {
    setModalData,
    isMakingApiCall,
    setIsMakingApiCall,
    userState: { currentUser },
  } = useContext(AppContext);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setIsMakingApiCall(true);

      axios
        .get('/api/tables', getConfig())
        .then(res => {
          setArchives([...res.data.data]);
        })
        .catch(err => setModalData({ type: 'error', text: err?.response?.data.error }))
        .finally(() => setIsMakingApiCall(false));
    }
  }, []);

  // if (isMakingApiCall) return <Loader />;
  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="archive">
      <p>
        Tu niedługo pojawią się wszystkie Twoje zarchiwizowane dane. <br /> Pracujemy nad tym :D
      </p>
      {/* <h2>Wersja robocza danych</h2>
      {archives.map(table => (
        <p>{table.createdAt}</p>
      ))} */}
    </div>
  );
};

export default Archive;
