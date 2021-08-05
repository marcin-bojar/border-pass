describe.only('Change users settings functionality', () => {
  const changedName = 'Changed name';
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/config');
  });

  it('Changes the users name', () => {
    cy.intercept('/api/users/*/name').as('name');
    cy.getByData('config-section').then($sections => {
      cy.wrap($sections.eq(0)).within(() => {
        cy.getByData('input-username').clear().type(changedName).should('have.value', changedName);
      });
      cy.contains('button', 'Zapisz').should('be.enabled').click();
      cy.wait('@name');
      cy.contains('h3', 'Informacja').should('be.visible');
      cy.contains('p', 'Twoje imię i nazwisko zostały zmienione.').should('be.visible');
      cy.contains('button', 'Zamknij').should('be.visible').should('be.enabled').click();
      cy.reload();
      cy.getByData('input-username').should('have.value', changedName);
      cy.contains('button', 'Zapisz').should('not.be.enabled');
    });
  });
});
