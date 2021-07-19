describe('Preview page', () => {
  let hFirst, minFirst, dateFirst;
  let hSecond, minSecond, dateSecond;
  let hThird, minThird, dateThird;
  let hFourth, minFourth, dateFourth;
  let hFifth, minFifth, dateFifth;

  beforeEach(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.intercept('/api/users/*/borders').as('borders');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/');
    cy.contains('button', 'PL').click();
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      hFirst = h;
      minFirst = min;
      dateFirst = date;
      cy.clock(now);
    });
    cy.getByData('trip-start-button').click();
    cy.wait('@borders');
    cy.moveTimeForward(3.7 * 60 * 60 * 1000).then(({ h, min, date }) => {
      hSecond = h;
      minSecond = min;
      dateSecond = date;
    });
    cy.contains('button', 'CZ').click();
    cy.wait('@borders');
    cy.moveTimeForward(13.3 * 60 * 60 * 1000).then(({ h, min, date }) => {
      hThird = h;
      minThird = min;
      dateThird = date;
    });
    cy.contains('button', 'SK').click();
    cy.wait('@borders');
    cy.moveTimeForward(7.3 * 60 * 60 * 1000).then(({ h, min, date }) => {
      hFourth = h;
      minFourth = min;
      dateFourth = date;
    });
    cy.contains('button', 'PL').click();
    cy.wait('@borders');
    cy.moveTimeForward(7.3 * 60 * 60 * 1000).then(({ h, min, date }) => {
      hFifth = h;
      minFifth = min;
      dateFifth = date;
    });
    cy.getByData('trip-end-button').click();
    cy.wait('@borders');
    cy.contains('button', Cypress.env('username')).click();
    cy.contains('li', 'Podgląd zestawienia').click();
  });

  it('Renders the Preview page correctly', () => {
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.getByData('preview-username').should('be.visible').and('contain', Cypress.env('username'));
    cy.getByData('preview-table').should('be.visible');
    // table's head
    cy.getByData('table-head').within(() => {
      cy.get('tr').then($rows => {
        expect($rows).to.have.length(1);
      });
      cy.get('th').then($headings => {
        expect($headings).to.have.length(5);
        expect($headings.eq(0).text()).to.eq('Wyjazd z bazy');
        expect($headings.eq(1).text()).to.eq('Punkt na trasiePrzekroczenie granicy');
        expect($headings.eq(2).text()).to.eq('Data');
        expect($headings.eq(3).text()).to.eq('Godzina');
        expect($headings.eq(4).text()).to.eq('Powrót na bazę');
      });
    });
    cy.wait(500);
    // table's body
    cy.getByData('table-body').within(() => {
      cy.get('tr').then($rows => {
        expect($rows).to.have.length(3);
        // first row of body
        expect($rows.eq(0).children().eq(0).text()).to.eq(`${dateFirst} ${hFirst}:${minFirst}`);
        expect($rows.eq(0).children().eq(1).text()).to.eq('PL   ->   CZ');
        expect($rows.eq(0).children().eq(2).text()).to.eq(dateSecond);
        expect($rows.eq(0).children().eq(3).text()).to.eq(`${hSecond}:${minSecond}`);
        expect($rows.eq(0).children().eq(4).text()).to.eq('');
        // second row of body
        expect($rows.eq(1).children().eq(0).text()).to.eq('');
        expect($rows.eq(1).children().eq(1).text()).to.eq('CZ   ->   SK');
        expect($rows.eq(1).children().eq(2).text()).to.eq(dateThird);
        expect($rows.eq(1).children().eq(3).text()).to.eq(`${hThird}:${minThird}`);
        expect($rows.eq(1).children().eq(4).text()).to.eq('');
        // thrid row of body
        expect($rows.eq(2).children().eq(0).text()).to.eq('');
        expect($rows.eq(2).children().eq(1).text()).to.eq('SK   ->   PL');
        expect($rows.eq(2).children().eq(2).text()).to.eq(dateFourth);
        expect($rows.eq(2).children().eq(3).text()).to.eq(`${hFourth}:${minFourth}`);
        expect($rows.eq(2).children().eq(4).text()).to.eq(`${dateFifth} ${hFifth}:${minFifth}`);
      });
    });
  });

  it('Displays edited items correctly', () => {
    cy.intercept('/api/users/*/borders/*').as('edit');
    cy.go('back');
    cy.getByData('toggle-edit').click();
    cy.getByData('trip-start-item').click();
    cy.getByData('input-date').clear().type('23.07.2032');
    cy.getByData('confirm-edit').click();
    cy.wait('@edit');
    cy.getByData('trip-end-item').click();
    cy.getByData('input-date').clear().type('19.07.2020');
    cy.getByData('confirm-edit').click();
    cy.wait('@edit');
    cy.getByData('history-item').first().click();
    cy.getByData('input-from').clear().type('FIN');
    cy.getByData('input-to').clear().type('SE');
    cy.getByData('input-time').clear().type('09:11');
    cy.getByData('confirm-edit').click();
    cy.wait('@edit');
    cy.go('forward');
    cy.getByData('table-body').within(() => {
      cy.get('tr').then($rows => {
        expect($rows).to.have.length(5);
        // first row
        expect($rows.eq(0).children().eq(0).text()).to.eq('');
        expect($rows.eq(0).children().eq(1).text()).to.eq('');
        expect($rows.eq(0).children().eq(2).text()).to.eq('');
        expect($rows.eq(0).children().eq(3).text()).to.eq('');
        expect($rows.eq(0).children().eq(4).text()).to.eq(`19.07.2020 ${hFifth}:${minFifth}`);
        // second row
        expect($rows.eq(1).children().eq(0).text()).to.eq('');
        expect($rows.eq(1).children().eq(1).text()).to.eq('FIN   ->   SE');
        expect($rows.eq(1).children().eq(2).text()).to.eq(dateSecond);
        expect($rows.eq(1).children().eq(3).text()).to.eq('09:11');
        expect($rows.eq(1).children().eq(4).text()).to.eq('');
        // third row
        expect($rows.eq(2).children().eq(0).text()).to.eq('');
        expect($rows.eq(2).children().eq(1).text()).to.eq('CZ   ->   SK');
        expect($rows.eq(2).children().eq(2).text()).to.eq(dateThird);
        expect($rows.eq(2).children().eq(3).text()).to.eq(`${hThird}:${minThird}`);
        expect($rows.eq(2).children().eq(4).text()).to.eq('');
        // fourth row
        expect($rows.eq(3).children().eq(0).text()).to.eq('');
        expect($rows.eq(3).children().eq(1).text()).to.eq('SK   ->   PL');
        expect($rows.eq(3).children().eq(2).text()).to.eq(dateFourth);
        expect($rows.eq(3).children().eq(3).text()).to.eq(`${hFourth}:${minFourth}`);
        expect($rows.eq(3).children().eq(4).text()).to.eq('');
        // last row
        expect($rows.eq(4).children().eq(0).text()).to.eq(`23.07.2032 ${hFirst}:${minFirst}`);
        expect($rows.eq(4).children().eq(1).text()).to.eq('');
        expect($rows.eq(4).children().eq(2).text()).to.eq('');
        expect($rows.eq(4).children().eq(3).text()).to.eq('');
        expect($rows.eq(4).children().eq(4).text()).to.eq('');
      });
    });
  });
});
