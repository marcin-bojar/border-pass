describe('App view', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
    cy.contains('button', 'PL').click();
    cy.contains('button', 'CZ').click();
  });

  it('Renders the app view correctly', () => {
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.getByData('current-country-container').should('be.visible');
    cy.getByData('trip-events-container').should('be.visible');
    cy.getByData('country-select-container').should('be.visible');
    cy.getByData('place-select-container').should('be.visible');
    cy.getByData('history-container').should('be.visible');
  });

  it("Hides the places' component", () => {
    cy.intercept('/api/users/*/preferences').as('config');
    cy.contains('button', 'Ukryj ten element').should('be.visible').and('be.enabled').click();
    cy.wait('@config');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Punkty na trasie zostały ukryte').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled').click();
    cy.getByData('place-select-container').should('not.exist');
  });
});
