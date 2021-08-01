describe('Archive page', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.intercept('/api/tables').as('tables');
    cy.visit('/');
  });

  it('Displays an empty archive correctly', () => {
    cy.openMenuItem('Archiwum');
    cy.wait('@tables');
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.contains('h2', 'Twoje archiwum').should('be.visible');
    cy.contains('button', 'Wszystkie')
      .should('be.visible')
      .and('be.enabled')
      .and('have.class', 'active');
    cy.contains('button', 'Nie wysłane')
      .should('be.visible')
      .and('be.enabled')
      .and('not.have.class', 'active');
    cy.contains('button', 'Wysłane')
      .should('be.visible')
      .and('be.enabled')
      .and('not.have.class', 'active');
    cy.contains('p', 'Nic tu jeszcze nie masz').should('be.visible');
    cy.contains('button', 'Nie wysłane').click().should('have.class', 'active');
    cy.contains('button', 'Wszystkie').should('not.have.class', 'active');
    cy.contains('button', 'Wysłane').should('not.have.class', 'active');
    cy.contains('p', 'Nic tu jeszcze nie masz').should('be.visible');
    cy.contains('button', 'Wysłane').click().should('have.class', 'active');
    cy.contains('button', 'Wszystkie').should('not.have.class', 'active');
    cy.contains('button', 'Nie wysłane').should('not.have.class', 'active');
    cy.contains('p', 'Nic tu jeszcze nie masz').should('be.visible');
  });
});
