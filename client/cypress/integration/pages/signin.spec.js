describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('Renders the sign in page correctly', () => {
    cy.get('div.nav-bar__guest a').should('have.length', 2).and('have.class', 'nav-bar__link');
    cy.get('div.heading a')
      .should('have.class', 'logo')
      .and('have.attr', 'href')
      .then($href => expect($href).to.eq('/'));
    cy.get('div.heading h2').should('contain', 'Rejestruj swoje przekroczenia granic');
    cy.get('div.sign-in-page input').should('have.length', 2);
    cy.get('button')
      .should('have.length', 1)
      .and('have.class', 'custom-button')
      .and('contain', 'Zaloguj');
  });
});
