describe('Add country functionality', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
  });

  it('Ads new country option to the list', () => {
    cy.getByData('add-country').should('be.visible').type('se{enter}').should('have.value', 'SE');
    cy.getByData('show-all-countries').should('contain', 'Więcej').click();
    cy.contains('button', 'SE').should('be.visible').and('be.enabled');
  });

  it('Allows to input only 3 characters as country name', () => {
    cy.getByData('add-country')
      .should('be.visible')
      .type('TOOLONG{enter}')
      .should('have.value', 'TOO');
  });
});
