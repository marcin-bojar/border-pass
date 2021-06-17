import 'cypress-localstorage-commands';

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[name=email]').type(email).should('have.value', email);
  cy.get('input[name=password]').type(password).should('have.value', password);
  cy.contains('button', 'Zaloguj').click();
});

Cypress.Commands.add('checkGuestHeader', () => {
  cy.get('div.nav-bar__guest a').should('have.length', 2).and('have.class', 'nav-bar__link');
});

Cypress.Commands.add('checkUserHeader', () => {
  cy.get('div.nav-bar__user button', { timeout: 10000 })
    .as('navbarButtons')
    .should('have.length', 2);
  cy.get('@navbarButtons').first().should('have.class', 'navbar navbar--user custom-button');
  cy.get('@navbarButtons').contains('Wyloguj').should('have.length', 1);
});

Cypress.Commands.add('checkHeading', () => {
  cy.get('div.heading a')
    .should('have.class', 'logo')
    .and('have.attr', 'href')
    .then($href => expect($href).to.eq('/'));
  cy.get('div.heading h2').should('contain', 'Rejestruj swoje przekroczenia granic');
});

Cypress.Commands.add('checkUserName', name => {
  cy.contains('button.navbar--user', name);
});
