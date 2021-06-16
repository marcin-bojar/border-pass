describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Renders the sign in page correctly', () => {
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.get('.sign-in__title').contains('Zaloguj się');
    cy.get('div.sign-in-page input').should('have.length', 2);
    cy.get('button')
      .should('have.length', 1)
      .and('have.class', 'custom-button')
      .and('contain', 'Zaloguj');
  });
});
