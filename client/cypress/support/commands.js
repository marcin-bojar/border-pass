import 'cypress-localstorage-commands';

Cypress.Commands.add('getByData', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('loginUser', (email, password) => {
  cy.getByData('email').type(email).should('have.value', email);
  cy.getByData('password').type(password).should('have.value', password);
  cy.contains('button', 'Zaloguj').click();
});

Cypress.Commands.add('registerUser', (userName, email, password, confirmPassword) => {
  userName && cy.getByData('name').type(userName).should('have.value', userName);
  email && cy.getByData('email').type(email).should('have.value', email);
  password && cy.getByData('password').type(password).should('have.value', password);
  confirmPassword &&
    cy.getByData('confirmPassword').type(confirmPassword).should('have.value', confirmPassword);
  cy.contains('button', 'Zarejestruj').click();
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

Cypress.Commands.add('clearAllInputs', () => {
  cy.get('input').each($input => cy.wrap($input).clear());
});

Cypress.Commands.add('checkErrorMessage', errorMessage => {
  cy.contains('div', errorMessage).should('have.class', 'error-message');
});
