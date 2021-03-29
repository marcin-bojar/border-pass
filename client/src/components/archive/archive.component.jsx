import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getConfig } from '../../utils';

import './archive.styles.scss';

const Archive = () => {
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    axios.get('/api/tables', getConfig()).then(res => {
      setArchives([...res.data.data]);
    });
  }, []);

  return (
    <div className="archive">
      <p>
        Tu niedługo pojawią się wszystkie Twoje zarchiwizowane dane. <br />{' '}
        Pracujemy nad tym :D
      </p>
      <h2>Wersja robocza danych</h2>
      {archives.map(table => (
        <p>{table.createdAt}</p>
      ))}
    </div>
  );
};

export default Archive;
