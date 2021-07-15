describe.only('User menu', () => {
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

  it('Opens and closes the dropdown', () => {
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').should('be.visible');
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').should('not.exist');
  });

  it('Contains proper items', () => {
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').within(() => {
      cy.get('li').then($items => {
        expect($items).to.have.length(4);
        expect($items.eq(0)).to.contain('Podgląd zestawienia');
        expect($items.eq(1)).to.contain('Wyślij zestawienie');
        expect($items.eq(2)).to.contain('Archiwum');
        expect($items.eq(3)).to.contain('Ustawienia');
      });
    });
  });
});
