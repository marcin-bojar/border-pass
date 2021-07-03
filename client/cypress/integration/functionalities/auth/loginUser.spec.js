describe('Log in functionality', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
  });

  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Logs in with valid data, redirects to homepage and logs out', () => {
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkUserName(Cypress.env('username'));
    cy.getLocalStorage('token').should('exist');
    cy.location('pathname').should('eq', '/');
    cy.contains('button.navbar', 'Wyloguj').click();
  });

  it('Doesnt log in with wrong password', () => {
    cy.loginUser(Cypress.env('email'), 'wrong');
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in without password', () => {
    cy.getByData('input-email')
      .type(`${Cypress.env('email')}{enter}`)
      .should('have.value', Cypress.env('email'));
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in with wrong email', () => {
    cy.loginUser('wrong@test.pl', Cypress.env('password'));
    cy.checkErrorMessage('Podany użytkownik nie istnieje.');
    cy.checkGuestHeader();
  });

  it('Prompts for a valid email', () => {
    cy.getByData('input-email').type('test@{enter}');
    cy.checkErrorMessage('Podany adres email jest nieprawidłowy.');
    cy.checkGuestHeader();
  });
});
