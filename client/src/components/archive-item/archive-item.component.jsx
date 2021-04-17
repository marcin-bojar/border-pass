import React from 'react';

import './archive-item.styles.scss';

const ArchiveItem = ({ data, ...props }) => {
  const { i, borders, status } = data;
  const isSent = status === 'sent';

  return (
    <li className="archive-item" {...props}>
      <div className="archive-item__block">
        <span className="archive-item__nr">{i + 1}.</span>
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
};

export default ArchiveItem;
