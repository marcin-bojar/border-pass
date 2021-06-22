describe('Sign up page', () => {
  it('Renders the sign up page correctly', () => {
    cy.visit('/signup');
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
