import React from 'react';

import ArchiveItem from '../archive-item/archive-item.component.jsx';

import './archive-list.styles.scss';

const ArchiveList = ({ list }) => {
  return (
    <ul className="archive-list">
      {list.map((el, i) => {
        const data = { ...el, i };
        console.log(data);
        return <ArchiveItem key={i} data={data} />;
      })}
    </ul>
  );
};

export default ArchiveList;
