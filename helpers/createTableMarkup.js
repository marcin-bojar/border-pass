const createTableMarkup = (user, borders) => {
  const markup = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link
                    href="https://fonts.googleapis.com/css2?family=Dosis:wght@500;700&display=swap"
                    rel="stylesheet">    

                <title>${user.name} - Border Pass</title>

                <style>
                    html {
                      font-size: 62.5%;
                    }

                    body {
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        background-image: linear-gradient(
                            to right bottom,
                            #540977,
                            #0d043a
                        );
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        min-height: 100vh;
                        max-width: 100vw;
                        padding: 2.5rem 1rem;
                        font-family: 'Dosis', sans-serif;
                        font-size: 1.6rem;
                        font-weight: 500;
                        color: #fff;
                    }

                    caption {
                      font-size: 2.5rem;
                      margin-bottom: 2rem;
                    }

                    table,
                    th,
                    td {
                        border: 1px solid #fff;
                        padding: 1rem;
                        text-align: center;
                    }

                    table {
                        width: 60%;
                        border-collapse: collapse;
                    }

                    th {
                        background-color: #fff;
                        font-size: 1.8rem;
                        color: #540977;
                        padding: 1.5rem 1rem;
                    }

                    th:not(:last-child) {
                        border-right: 1px solid #540977;
                        }

                    @media only print {
                        

                        table,
                        th,
                        td {
                            border: 1px solid #000;
                            color: #000;
                        }

                        table {
                          width: 80%;
                          max-height: 95vh;
                        }

                        caption {
                          color: #000;
                        }
                    }
                             
                </style>
            </head>
            <body>
               <table id='table'>
                     <caption className="borders-table__name">${
                       user.name
                     }</caption>
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
                    ${borders
                      .map(border => {
                        if (
                          border.type === 'tripStart' ||
                          border.type === 'tripEnd'
                        ) {
                          const row = `
                            <tr>
                            <td>
                                ${
                                  border.type === 'tripStart'
                                    ? `${border.date} ${border.time}`
                                    : ''
                                }
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                ${
                                  border.type === 'tripEnd'
                                    ? `${border.date} ${border.time}`
                                    : ''
                                }
                            </td>
                            </tr>
                        `;
                          return row;
                        } else {
                          const row = `
                            <tr>
                            <td></td>
                            <td>
                                ${border.from} &nbsp; -> &nbsp; ${border.to}
                            </td>
                            <td>${border.date}</td>
                            <td>${border.time}</td>
                            <td></td>
                            </tr>
                        `;
                          return row;
                        }
                      })
                      .join('')}
                    </tbody>
               </table>

               <script>
               const table = document.getElementById('table');
               
               const displayTripEventsInSameRow = table => {
                  for (let i = 1; i < table.rows.length; i++) {
                    const tripStartEventFound = table.rows[i].cells[0].innerText;
                    const tripEndEventFound = table.rows[i].cells[4].innerText;
                    const isFirstRow = i === 1;
                    const isLastRow = i === table.rows.length - 1;

                    if (tripStartEventFound && !isLastRow) {
                      //Copy border crossing's data (columns 2-4) from next row to the current row and delete next row
                      for (let j = 1; j < 5; j++) {
                        table.rows[i].cells[j].innerText = table.rows[i + 1].cells[j].innerText;
                      }
                      table.deleteRow(i + 1);
                    }

                    if (tripEndEventFound && !isFirstRow) {
                      //Copy the tripEnd event's data (column 5) one row up, delete current row and update 'i' counter to new table's size (decrement by one)
                      table.rows[i - 1].cells[4].innerText = table.rows[i].cells[4].innerText;
                      table.deleteRow(i);
                      i--;
                    }
                  }
                };
               displayTripEventsInSameRow(table);   
              </script>
            </body>
        </html>   
      `;

  return markup;
};

module.exports = createTableMarkup;
