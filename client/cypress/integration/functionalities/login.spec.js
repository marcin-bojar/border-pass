describe('Logging in and out', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Logs in with valid data and logs out', () => {
    cy.login('test@test.pl', 'marcin1');

    cy.get('button.navbar--user').contains('Test Testowy');
    cy.get('button.navbar').contains('Wyloguj').click();
  });

  it('Doesnt log in with wrong password', () => {
    cy.login('test@test.pl', 'wrong');
    cy.get('div.error-message').contains('Podane dane logowania są błędne.');
  });

  it('Doesnt log in without password', () => {
    cy.get('input[name=email]').type('test@test.pl').should('have.value', 'test@test.pl');
    cy.get('button').contains('Zaloguj').click();
    cy.get('div.error-message').contains('Podane dane logowania są błędne.');
  });

  it('Doesnt log in with wrong email', () => {
    cy.login('wrong@test.pl', 'marcin1');
    cy.get('div.error-message').contains('Podany użytkownik nie istnieje.');
  });

  it('Prompts for a valid email', () => {
    cy.get('input[name=email]').type('test@{enter}');
    cy.get('div.error-message').contains('Podany adres email jest nieprawidłowy.');
  });
});
