describe('Add place functionality', () => {
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

  it('Adds new palce to the list', () => {
    cy.contains('button', 'PL').click();
    cy.getByData('add-place')
      .should('be.visible')
      .type('opole{enter}')
      .should('have.value', 'OPOLE');
    cy.contains('button', 'OPOLE').should('be.visible').and('be.enabled');
  });

  it("Allows to input max 15 characters as palce's name", () => {
    cy.contains('button', 'PL').click();
    cy.getByData('add-place')
      .should('be.visible')
      .type('TOOLONGNAMEFORTHEPLACE{enter}')
      .should('have.value', 'TOOLONGNAMEFORT');
    cy.contains('button', 'TOOLONGNAMEFORT').should('be.visible').and('be.enabled');
  });

  it('Not allows to add same place twice', () => {
    cy.contains('button', 'PL').click();
    cy.getByData('add-place').type('ZABRZE{enter}');
    cy.getByData('add-place').type('zabrze{enter}');
    cy.getByData('alert-modal')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Błąd').should('be.visible');
        cy.contains('p', 'Ten punkt jest już na liście.').should('be.visible');
        cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled');
      });
  });
});
