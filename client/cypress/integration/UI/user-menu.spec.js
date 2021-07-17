describe('User menu', () => {
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

  it('Opens and closes the menu', () => {
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').should('be.visible');
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').should('not.exist');
  });

  it('Contains correct items', () => {
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').within(() => {
      cy.get('li').then($items => {
        expect($items).to.have.length(4);
        expect($items.get(0)).to.contain('Podgląd zestawienia');
        expect($items.get(1)).to.contain('Wyślij zestawienie');
        expect($items.get(2)).to.contain('Archiwum');
        expect($items.get(3)).to.contain('Ustawienia');
      });
    });
    cy.contains('button', Cypress.env('username')).click();
  });

  it('Links to correct pages', () => {
    cy.contains('button', Cypress.env('username')).should('be.visible').and('be.enabled').click();
    cy.getByData('user-menu').within(() => {
      cy.get('li').as('items');
    });
    cy.get('@items').then($items => {
      expect($items.eq(0).children('a')).to.have.attr('href', '/preview');
      expect($items.eq(1).children('a')).to.have.attr('href', '/send');
      expect($items.eq(2).children('a')).to.have.attr('href', '/archive');
      expect($items.eq(3).children('a')).to.have.attr('href', '/config');
    });
    cy.get('@items').eq(0).click();
    cy.url().should('include', '/preview');
    cy.go('back');
    cy.contains('button', Cypress.env('username')).click();
    cy.get('@items').eq(1).click();
    cy.url().should('include', '/send');
    cy.go('back');
    cy.contains('button', Cypress.env('username')).click();
    cy.get('@items').eq(2).click();
    cy.url().should('include', '/archive');
    cy.go('back');
    cy.contains('button', Cypress.env('username')).click();
    cy.get('@items').eq(3).click();
    cy.url().should('include', '/config');
  });
});
