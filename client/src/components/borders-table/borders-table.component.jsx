import React, { useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import Loader from '../loader/loader.component';

import { AppContext } from '../../hooks/useAppState';
import {
  displayTripEventsInSameRow,
  sortHistoryListByTimeAndDate,
} from '../../utils';

import './borders-table.styles.scss';

const BordersTable = () => {
  const { borders, currentUser, userLoading, isSortedDesc } = useContext(
    AppContext
  );
  const tableRef = useRef(null);
  let sortedBorders = borders;

  if (isSortedDesc)
    sortedBorders = sortHistoryListByTimeAndDate(borders, isSortedDesc);

  useEffect(() => {
    if (currentUser) {
      const table = tableRef.current;

      displayTripEventsInSameRow(table);
    }
  }, [userLoading]);

  if (userLoading) return <Loader />;

  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="borders-table">
      {/* <h2 className="borders-table__name">{currentUser.name}</h2> */}
      <table ref={tableRef}>
        <caption className="borders-table__name">{currentUser.name}</caption>
        <thead>
          <tr>
            <th>Wyjazd z bazy</th>
            <th>Przekroczenie granicy</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Powrót na bazę</th>
          </tr>
        </thead>
        <tbody>
          {sortedBorders.map((border, i) => {
            if (border.type === 'tripStart' || border.type === 'tripEnd') {
              const row = (
                <tr key={i}>
                  <td>
                    {border.type === 'tripStart'
                      ? `${border.date} ${border.time}`
                      : null}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {border.type === 'tripEnd'
                      ? `${border.date} ${border.time}`
                      : null}
                  </td>
                </tr>
              );
              return row;
            } else {
              const row = (
                <tr key={i}>
                  <td></td>
                  <td>
                    {border.from} &nbsp; {'->'} &nbsp; {border.to}
                  </td>
                  <td>{border.date}</td>
                  <td>{border.time}</td>
                  <td></td>
                </tr>
              );
              return row;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BordersTable;
