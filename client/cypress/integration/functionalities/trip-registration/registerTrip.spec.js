describe.only('Registering trip functionality', () => {
  let token;

  before(() => {
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'))
      .its('body')
      .then($body => {
        token = $body.data.token;
      });
  });

  beforeEach(() => {
    cy.setLocalStorage('token', JSON.stringify(token));
    cy.visit('/');
  });

  after(() => {
    cy.exec('npm run reset:db');
  });

  it('Selects the current country', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.contains('h2', 'Obecnie znajdujesz się w:').should('be.visible');
    cy.getByData('current-country').should('be.visible').and('contain', 'PL');
  });

  it('Clears the current country and selects again', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.getByData('clear-current-country').contains('Wyczyść').click();
    cy.contains('h3', 'Witaj w Border Pass!').should('be.visible');
    cy.contains('W jakim obecnie znajdujesz się kraju?').should('be.visible');
    cy.getByData('current-country').should('not.exist');
    cy.contains('button', 'CZ').should('be.visible').click();
    cy.getByData('current-country').should('be.visible').and('contain', 'CZ');
  });

  it('Starts a trip', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.getByData('trip-start-button').should('be.visible').click();
    cy.getByData('trip-start-item').contains('Wyjazd z bazy').should('be.visible');
  });

  it('Ends a trip', () => {
    cy.getByData('trip-end-button').should('be.visible').click();
    cy.getByData('trip-end-item').contains('Powrót na bazę').should('be.visible');
  });
});
