describe("Settings' page", () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/config');
  });

  it('Renders the Settings page correctly', () => {
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.contains('h2', 'Ustawienia').should('be.visible');
    cy.get('section')
      .should('have.length', 3)
      .then($sections => {
        // first section
        cy.wrap($sections.eq(0)).within(() => {
          cy.contains('h3', 'Twoje dane').should('be.visible');
          cy.contains('label', 'Imię i nazwisko').should('be.visible');
          cy.get('input[name=userName]').should('have.value', Cypress.env('username'));
          cy.contains('button', 'Zapisz').should('be.visible').and('be.disabled');
        });
        // second section
        cy.wrap($sections.eq(1)).within(() => {
          cy.contains('h3', 'Dane Twojej Firmy').should('be.visible');
          cy.contains('label', 'Nazwa Firmy').should('be.visible');
          cy.contains('label', 'Adres Email').should('be.visible');
          cy.get('input[name=companyName]').should('have.value', 'Tor');
          cy.get('input[name=companyEmail]').should('have.value', 'test@test.pl');
          cy.contains('button', 'Zapisz').should('be.visible').and('be.disabled');
        });
        // third section
        cy.wrap($sections.eq(2)).within(() => {
          cy.contains('h3', 'Twoje ustawienia').should('be.visible');
          cy.contains('p', 'Pokazuj punkty na trasie').should('be.visible');
          cy.get('input[name=showPlaces]').should('be.not.visible').and('be.checked');
          cy.contains('button', 'Zapisz').should('be.visible').and('be.disabled');
        });
      });
  });
});
