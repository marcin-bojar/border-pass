describe('Welcome page', () => {
  it('Renders the Welcome page correctly', () => {
    cy.visit('/');
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.contains('h3', 'Witaj w Border Pass');
    cy.get('div.welcome').children('p').should('have.length', 3);
    cy.get('a.welcome__link').should('have.length', 2);
    cy.contains('button', 'Kontynuuj jako gość');
  });
});
