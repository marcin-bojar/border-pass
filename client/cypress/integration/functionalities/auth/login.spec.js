describe('Logging in and out', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Logs in with valid data and logs out', () => {
    cy.login('test@test.pl', 'marcin1');

    cy.checkUserHeader();
    cy.checkUserName('Test Testowy');
    cy.getLocalStorage('token').should('exist');
    cy.contains('button.navbar', 'Wyloguj').click();
  });

  it('Doesnt log in with wrong password', () => {
    cy.login('test@test.pl', 'wrong');
    cy.contains('div.error-message', 'Podane dane logowania są błędne.');
  });

  it('Doesnt log in without password', () => {
    cy.get('input[name=email]').type('test@test.pl').should('have.value', 'test@test.pl');
    cy.contains('button', 'Zaloguj').click();
    cy.contains('div.error-message', 'Podane dane logowania są błędne.');
  });

  it('Doesnt log in with wrong email', () => {
    cy.login('wrong@test.pl', 'marcin1');
    cy.contains('div.error-message', 'Podany użytkownik nie istnieje.');
  });

  it('Prompts for a valid email', () => {
    cy.get('input[name=email]').type('test@{enter}');
    cy.contains('div.error-message', 'Podany adres email jest nieprawidłowy.');
  });
});
