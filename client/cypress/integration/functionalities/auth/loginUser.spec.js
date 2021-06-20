describe('Logging in and out', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Logs in with valid data and logs out', () => {
    cy.loginUser('test@test.pl', 'marcin1');
    cy.checkUserHeader();
    cy.checkUserName('Test Testowy');
    cy.getLocalStorage('token').should('exist');
    cy.contains('button.navbar', 'Wyloguj').click();
  });

  it('Doesnt log in with wrong password', () => {
    cy.loginUser('test@test.pl', 'wrong');
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in without password', () => {
    cy.get('input[name=email]').type('test@test.pl{enter}').should('have.value', 'test@test.pl');
    cy.checkErrorMessage('Podane dane logowania są błędne.');
    cy.checkGuestHeader();
  });

  it('Doesnt log in with wrong email', () => {
    cy.loginUser('wrong@test.pl', 'marcin1');
    cy.checkErrorMessage('Podany użytkownik nie istnieje.');
    cy.checkGuestHeader();
  });

  it('Prompts for a valid email', () => {
    cy.get('input[name=email]').type('test@{enter}');
    cy.checkErrorMessage('Podany adres email jest nieprawidłowy.');
    cy.checkGuestHeader();
  });
});
