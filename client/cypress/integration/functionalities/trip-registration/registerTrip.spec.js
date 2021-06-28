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

  it('Adds a new palce to the list', () => {});

  it('Starts a trip', () => {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.contains('button', 'PL').should('be.visible').click();
      cy.getByData('trip-start-button').should('be.visible').click();
      cy.getByData('trip-start-item').within(() => {
        cy.contains('Wyjazd z bazy').should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
      cy.getByData('history-list').children('li').should('have.length', 1);
    });
  });

  it('Registers border pass', () => {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.contains('button', 'CZ').should('be.visible').click();
      cy.getByData('history-item').within(() => {
        cy.contains(/^PL.*CZ$/).should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
      cy.getByData('history-list').children('li').should('have.length', 2);
    });
  });

  it('Ends a trip', () => {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.getByData('trip-end-button').should('be.visible').click();
      cy.getByData('trip-end-item').within(() => {
        cy.contains('Powrót na bazę').should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
      cy.getByData('history-list').children('li').should('have.length', 3);
    });
  });
});
