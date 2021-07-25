import React, { useContext, forwardRef } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './archive-item.styles.scss';

const ArchiveItem = forwardRef(({ data, ...props }, ref) => {
  const {
    dataState: { selectedArchive },
    setDataState,
  } = useContext(AppContext);
  const { index, borders, status } = data;
  const isSent = status === 'sent';

  const handleClick = () => {
    if (selectedArchive && selectedArchive._id === data._id)
      setDataState({ type: 'SET_SELECTED_ARCHIVE', payload: null });
    else setDataState({ type: 'SET_SELECTED_ARCHIVE', payload: data });
  };

  return (
    <li onClick={handleClick} className="archive-item" ref={ref} {...props}>
      <div className="archive-item__block">
        <span className="archive-item__nr">{index + 1}.</span>
        <span className="archive-item__range">{`${borders[0].date} - ${
          borders[borders.length - 1].date
        }`}</span>
      </div>
      <div className="archive-item__block">
        <span className={`${isSent ? 'sent' : ''} archive-item__status`}>
          {isSent ? 'Wysłane' : 'Nie wysłane'}
        </span>
      </div>
    </li>
  );
});

export default ArchiveItem;
