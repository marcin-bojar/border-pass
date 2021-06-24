describe('Log in functionality', () => {
  before(() => {
    cy.exec('npm run seed:db');
  });

  beforeEach(() => {
    cy.visit('/signin');
  });

  after(() => {
    cy.exec('npm run reset:db');
  });

  it('Logs in with valid data and logs out', () => {
    cy.loginUser('testing@test.pl', 'password123');
    cy.checkUserHeader('Tester Name');
    cy.checkUserName('Tester Name');
    cy.getLocalStorage('token').should('exist');
    cy.contains('button.navbar', 'Wyloguj').click();
  });

  it('Doesnt log in with wrong password', () => {
    cy.loginUser('testing@test.pl', 'wrong');
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in without password', () => {
    cy.getByData('email').type('testing@test.pl{enter}').should('have.value', 'testing@test.pl');
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in with wrong email', () => {
    cy.loginUser('wrong@test.pl', 'password123');
    cy.checkErrorMessage('Podany użytkownik nie istnieje.');
    cy.checkGuestHeader();
  });

  it('Prompts for a valid email', () => {
    cy.getByData('email').type('test@{enter}');
    cy.checkErrorMessage('Podany adres email jest nieprawidłowy.');
    cy.checkGuestHeader();
  });
});
