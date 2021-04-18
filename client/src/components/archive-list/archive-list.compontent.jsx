import React, { createRef, useContext, useEffect } from 'react';

import { AppContext } from '../../hooks/useAppState';

import ArchiveItem from '../archive-item/archive-item.component.jsx';

import './archive-list.styles.scss';

const ArchiveList = ({ list }) => {
  const {
    dataState: { selectedArchive },
    setDataState,
  } = useContext(AppContext);

  const itemRefsArray = [];
  const removeSelectedClass = () =>
    itemRefsArray.forEach(itemRef => {
      itemRef.current.classList.remove('selected');
    });

  useEffect(() => {
    removeSelectedClass();
    if (selectedArchive) itemRefsArray[selectedArchive.i].current.classList.add('selected');
  }, [selectedArchive]);

  useEffect(() => {
    if (selectedArchive) {
      removeSelectedClass();

      const selectedIndex = list.findIndex(el => el._id === selectedArchive._id);
      if (selectedIndex > -1) itemRefsArray[selectedIndex].current.classList.add('selected');
    }
  }, [list]);

  useEffect(() => () => setDataState({ type: 'SET_SELECTED_ARCHIVE', payload: null }), []);

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
