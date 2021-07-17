import React, { useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../../hooks/useAppState';
import { displayTripEventsInSameRow, sortHistoryListByTimeAndDate } from '../../utils';

import './borders-table.styles.scss';

const BordersTable = () => {
  const {
    userState: { currentUser },
    dataState: { historyList },
  } = useContext(AppContext);
  const tableData = sortHistoryListByTimeAndDate([...historyList], true);
  const tableRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      const table = tableRef.current;
      displayTripEventsInSameRow(table);
    }
  }, []);

  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="borders-table" data-test="preview-table">
      <table ref={tableRef}>
        <caption className="borders-table__name" data-test="preview-username">
          {currentUser.name}
        </caption>
        <thead data-test="table-head">
          <tr>
            <th>Wyjazd z bazy</th>
            <th>
              Punkt na trasie
              <br />
              Przekroczenie granicy
            </th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Powrót na bazę</th>
          </tr>
        </thead>
        <tbody data-test="table-body">
          {tableData.map((border, i) => {
            if (border.type === 'tripStart' || border.type === 'tripEnd') {
              const row = (
                <tr key={i}>
                  <td>{border.type === 'tripStart' ? `${border.date} ${border.time}` : null}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{border.type === 'tripEnd' ? `${border.date} ${border.time}` : null}</td>
                </tr>
              );
              return row;
            } else {
              const row = (
                <tr key={i}>
                  <td></td>
                  {border.type === 'place' ? (
                    <td>{border.name}</td>
                  ) : (
                    <td>
                      {border.from} &nbsp; {'->'} &nbsp; {border.to}
                    </td>
                  )}
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
