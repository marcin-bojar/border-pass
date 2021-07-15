describe('Sign in page', () => {
  it('Renders the sign in page correctly', () => {
    cy.visit('/signin');
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.getByData('title').contains('Zaloguj się');
    cy.getByDataLike('input').should('have.length', 2);
    cy.getByData('submit')
      .should('be.visible')
      .and('have.class', 'custom-button')
      .and('contain', 'Zaloguj');
  });
});
