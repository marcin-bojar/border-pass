describe('Welcome page', () => {
  it.only('Renders the Welcome page correctly', () => {
    cy.visit('/');
    cy.checkGuestHeader();
    cy.checkHeading();
    cy.getByData('title').contains('Witaj w Border Pass').should('be.visible');
    cy.getByData('text').should('have.length', 3);
    cy.getByData('link').should('have.length', 2);
    cy.contains('button', 'Kontynuuj jako gość').should('be.visible');
  });
});
