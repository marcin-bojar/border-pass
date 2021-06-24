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
  cy.getByData('guestNavbar')
    .children('a')
    .should($links => {
      expect($links).to.have.length(2);
      expect($links).to.contain('Zaloguj');
      expect($links).to.contain('Zarejestruj');
    });
});

Cypress.Commands.add('checkUserHeader', userName => {
  cy.getByData('userNavbar', { timeout: 10000 })
    .find('button')
    .as('navbarButtons')
    .should('have.length', 2);
  cy.get('@navbarButtons').first().should('contain', userName);
  cy.get('@navbarButtons').contains('Wyloguj').should('have.length', 1);
});

Cypress.Commands.add('checkHeading', () => {
  cy.getByData('headingLogo')
    .should('have.class', 'logo')
    .and('have.attr', 'href')
    .then($href => expect($href).to.eq('/'));
  cy.getByData('headingSubtitle').should('contain', 'Rejestruj swoje przekroczenia granic');
});

Cypress.Commands.add('checkUserName', name => {
  cy.contains('button', name);
});

Cypress.Commands.add('clearAllInputs', () => {
  cy.get('input').each($input => cy.wrap($input).clear());
});

Cypress.Commands.add('checkErrorMessage', errorMessage => {
  cy.contains('div', errorMessage).should('have.class', 'error-message');
});
