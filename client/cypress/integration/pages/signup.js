describe('Sign up page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it.only('renders the sign up page correctly', () => {
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.get('.sign-up__title').contains('Zarejestruj się');
    cy.get('div.sign-up-page input').should('have.length', 4);
    cy.get('button')
      .should('have.length', 1)
      .and('have.class', 'custom-button')
      .and('contain', 'Zarejestruj');
  });
});
