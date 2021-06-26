describe('Sign up page', () => {
  it.only('Renders the sign up page correctly', () => {
    cy.visit('/signup');
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.getByData('title').contains('Zarejestruj się');
    cy.getByDataLike('input').should('have.length', 4);
    cy.getByData('submit')
      .should('be.visible')
      .and('have.class', 'custom-button')
      .and('contain', 'Zarejestruj');
  });
});
