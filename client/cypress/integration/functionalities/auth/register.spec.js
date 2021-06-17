describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/signup');
    cy.exec('npm run reset:db');
  });

  after(() => {
    cy.exec('npm run reset:db');
  });

  it.only('Signs up with correct data', () => {
    cy.get('input[name=name]').type('Tester Name').should('have.value', 'Tester Name');
    cy.get('input[name=email]').type('testing@test.pl').should('have.value', 'testing@test.pl');
    cy.get('input[name=password]').type('password123').should('have.value', 'password123');
    cy.get('input[name=confirmPassword]').type('password123').should('have.value', 'password123');
    cy.contains('button', 'Zarejestruj').click();
    cy.checkUserName('Tester Name');
  });
});
