describe('Login', () => {
  it('Logs in with valid data', () => {
    cy.visit('localhost:1234/signin');

    cy.get('input[name=email]').type('test@test.pl');
    cy.get('input[name=password]').type('marcin1');
    cy.get('button').contains('Zaloguj').click();

    cy.get('button.navbar--user').contains('Test Testowy');
  });
});
