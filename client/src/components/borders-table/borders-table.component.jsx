import React, { useContext } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './borders-table.styles.scss';

const BordersTable = () => {
  const { borders } = useContext(AppContext);

  return (
    <div className="borders-table">
      <table>
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BordersTable;
