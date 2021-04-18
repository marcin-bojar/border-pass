import React, { createRef, useContext, useEffect } from 'react';

import { AppContext } from '../../hooks/useAppState';

import ArchiveItem from '../archive-item/archive-item.component.jsx';

import './archive-list.styles.scss';

const ArchiveList = ({ list }) => {
  const {
    dataState: { selectedArchive },
  } = useContext(AppContext);

  const itemRefsArray = [];

  useEffect(() => {
    itemRefsArray.forEach(itemRef => {
      itemRef.current.classList.remove('selected');
    });
    if (selectedArchive) itemRefsArray[selectedArchive.i].current.classList.add('selected');
  }, [selectedArchive]);

  return (
    <ul className="archive-list">
      {list.map((el, i) => {
        const itemRef = createRef();
        itemRefsArray.push(itemRef);
        const data = { ...el, i };
        return <ArchiveItem ref={itemRef} key={i} data={data} />;
      })}
    </ul>
  );
};

export default ArchiveList;
