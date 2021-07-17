describe('Preview page', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/');
    cy.intercept('/api/users/*/borders').as('borders');
    cy.contains('button', 'PL').click();
    cy.contains('button', 'CZ').click();
    cy.wait('@borders');
    cy.contains('button', 'SK').click();
    cy.wait('@borders');
    cy.contains('button', 'PL').click();
    cy.wait('@borders');
    cy.contains('button', Cypress.env('username')).click();
    cy.contains('li', 'Podgląd zestawienia').click();
  });

  it.only('Renders the Preview page correctly', () => {
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.getByData('preview-username').should('be.visible').and('contain', Cypress.env('username'));
    cy.getByData('preview-table').should('be.visible');
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
    cy.getByData('table-body').within(() => {
      cy.get('tr').then($rows => {
        expect($rows).to.have.length(3);
        expect($rows.eq(0).children().eq(1).text()).to.eq('PL   ->   CZ');
        expect($rows.eq(1).children().eq(1).text()).to.eq('CZ   ->   SK');
        expect($rows.eq(2).children().eq(1).text()).to.eq('SK   ->   PL');
      });
    });
  });
});
