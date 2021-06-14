describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it.only('Renders the sign in page correctly', () => {
    cy.get('div.nav-bar__guest').should($header => {
      const $links = $header.find('a.nav-bar__link');
      expect($links).to.have.length(2);
    });
    cy.get('div.heading');
    cy.get('div.sign-in-page').should($page => {
      const $inputs = $page.find('input');
      expect($inputs).to.have.length(2);
    });
  });
});
