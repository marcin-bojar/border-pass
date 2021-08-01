describe("Settings' page", () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.intercept('/api/users').as('users');
    cy.visit('/');
  });
});
