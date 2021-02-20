import React, { useContext, useEffect, useRef } from 'react';

import { AppContext } from '../../hooks/useAppState';
import { displayTripEventsInSameRow } from '../../utils';

import './borders-table.styles.scss';

const BordersTable = () => {
  const { borders } = useContext(AppContext);
  const tableRef = useRef(null);
  useEffect(() => {
    const table = tableRef.current;

    displayTripEventsInSameRow(table);
  }, []);

  return (
    <div className="borders-table">
      <table ref={tableRef}>
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
          {borders.map((border, i) => {
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
