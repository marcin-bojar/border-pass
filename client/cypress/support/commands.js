import 'cypress-localstorage-commands';

Cypress.Commands.add('getByData', selector => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('getByDataLike', selector => {
  return cy.get(`[data-test*=${selector}]`);
});

Cypress.Commands.add('loginUser', (email, password) => {
  cy.getByData('input-email').type(email).should('have.value', email);
  cy.getByData('input-password').type(password).should('have.value', password);
  cy.contains('button', 'Zaloguj').click();
});

Cypress.Commands.add('loginUserWithoutUI', (email, password) => {
  cy.request('POST', '/api/auth/signin', { email, password })
    .its('body.data')
    .then($userData => {
      cy.setLocalStorage('token', JSON.stringify($userData.token));
    });
});

Cypress.Commands.add('registerUser', (userName, email, password, confirmPassword) => {
  userName && cy.getByData('input-name').type(userName).should('have.value', userName);
  email && cy.getByData('input-email').type(email).should('have.value', email);
  password && cy.getByData('input-password').type(password).should('have.value', password);
  confirmPassword &&
    cy
      .getByData('input-confirmPassword')
      .type(confirmPassword)
      .should('have.value', confirmPassword);
  cy.contains('button', 'Zarejestruj').click();
});

Cypress.Commands.add('checkGuestHeader', () => {
  cy.getByData('guestNavbar')
    .should('be.visible')
    .children('a')
    .should($links => {
      expect($links).to.have.length(2);
      expect($links).to.contain('Zaloguj');
      expect($links).to.contain('Zarejestruj');
    });
});

Cypress.Commands.add('checkUserHeader', userName => {
  cy.getByData('userNavbar', { timeout: 10000 })
    .should('be.visible')
    .find('button')
    .as('navbarButtons')
    .should('have.length', 2);
  cy.get('@navbarButtons').first().should('contain', userName);
  cy.get('@navbarButtons').contains('Wyloguj').should('have.length', 1);
});

Cypress.Commands.add('checkHeading', () => {
  cy.getByData('headingLogo')
    .should('be.visible')
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

Cypress.Commands.add('getCurrentTimeAndDate', () => {
  const now = new Date();
  const h = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const day = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`;
  const month = `${now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}`;
  const date = `${day}.${month}.${now.getFullYear()}`;

  return cy.wrap({
    now,
    h,
    min,
    date,
  });
});
