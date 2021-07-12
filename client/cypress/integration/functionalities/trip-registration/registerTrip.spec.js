describe('Registering trip functionality', function () {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.intercept('**/api/users/**').as('users');
    cy.restoreLocalStorage();
    cy.visit('/');
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
    cy.getByData('clear-current-country').contains('Wyczyść').click();
  });

  it('Starts a trip', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.contains('button', 'CZ').should('be.visible').click();
      cy.wait('@users');
      cy.getByData('trip-start-button').should('be.visible').and('be.enabled').click();
      cy.getByData('trip-start-item').within(() => {
        cy.contains('Wyjazd z bazy').should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
    });
  });

  it('Registers border pass', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.contains('button', 'DE').should('be.visible').click();
      cy.wait('@users');
      cy.contains('button', 'NL').should('be.visible').click();
      cy.wait('@users');
      cy.contains('button', 'DE').should('be.visible').click();
      cy.wait('@users');
      cy.contains('button', 'PL').should('be.visible').click();
      cy.wait('@users');
      cy.getByData('history-list').within(() => {
        cy.contains(/^PL.*DE$/).should('be.visible');
        cy.contains(/^DE.*NL$/).should('be.visible');
        cy.contains(/^NL.*DE$/).should('be.visible');
        cy.contains(/^DE.*PL$/).should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
    });
  });

  it('Registers point on the route', () => {
    cy.contains('button', 'DE').should('be.visible').click();
    cy.getByData('add-place').type('Opole{enter}').should('have.value', 'OPOLE');
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.contains('button', 'OPOLE').should('be.visible').click();
      cy.getByData('history-list').within(() => {
        cy.contains('OPOLE').should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
    });
  });

  it("Removes last history list's entry", function () {
    cy.getByData('app').then($app => {
      if ($app.find('[data-test=current-country-container]').length > 0) {
        cy.contains('button', 'CZ').click();
        cy.wait('@users');
      } else {
        cy.contains('button', 'PL').click();
      }
    });
    cy.contains('button', 'DE').click();
    cy.wait('@users');
    cy.contains('button', 'CZ').click();
    cy.wait('@users');
    cy.contains('button', 'AT').click();
    cy.wait('@users');
    cy.getByData('history-list')
      .contains('span', /^CZ.*AT$/)
      .as('last')
      .should('be.visible');
    cy.getByData('remove-last-country').should('be.visible').and('be.enabled').click();
    cy.getByData('confirm-modal')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Potwierdź').should('be.visible');
        cy.contains('p', 'Usuwasz ostatni wpis z Historii Podróży. Czy chcesz kontynuować?').should(
          'be.visible'
        );
        cy.contains('button', 'Kontynuuj').should('be.visible').and('be.enabled').click();
      });
    cy.wait('@users');
    cy.wait(1).then(() => {
      expect(this.last).to.not.exist;
    });
  });

  it('Ends a trip', () => {
    cy.contains('button', 'PL').should('be.visible').click();
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.getByData('trip-end-button').should('be.visible').click();
      cy.getByData('trip-end-item').within(() => {
        cy.contains('Powrót na bazę').should('be.visible');
        cy.contains(`${h}:${min}`).should('be.visible');
        cy.contains(date).should('be.visible');
      });
    });
  });
});
