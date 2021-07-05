describe.only('Registering trip functionality', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.saveLocalStorage();
  });

  beforeEach(() => {
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
      cy.getByData('trip-start-button').should('be.visible').click();
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
      cy.contains('button', 'NL').should('be.visible').click();
      cy.contains('button', 'DE').should('be.visible').click();
      cy.contains('button', 'PL').should('be.visible').click();
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
    cy.intercept('**/api/users/**').as('users');
    cy.contains('button', 'PL').click();
    cy.contains('button', 'DE').click();
    cy.contains('button', 'CZ').click();
    cy.contains('button', 'SK').click();
    cy.wait('@users');
    cy.wait(1000); // NEEDS RESEARCH! wait for app's state to update, otherwise test fails.
    cy.getByData('history-list')
      .children()
      .then($items => {
        cy.get($items[$items.length - 1]).as('last');
      });
    cy.get('@last').within(() => {
      cy.contains('span', /^CZ.*SK$/).should('be.visible');
    });
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
    // wait 1sec for app's state update again
    cy.wait(1000).then(() => {
      expect(this.last).to.not.exist;
    });
  });

  it.only('Edits the history item (border pass)', function () {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.intercept('POST', '**/api/users/**').as('users');
      cy.clock(now);
      cy.contains('button', 'SK').should('be.visible').click();
      cy.contains('button', 'CZ').should('be.visible').click();
      cy.getByData('history-list')
        .children()
        .then($items => {
          cy.get($items[$items.length - 1]).as('last');
        });
      cy.getByData('toggle-edit').should('be.visible').and('be.enabled').click();
      cy.getByData('history-editor').should('be.visible');
      cy.get('@last').click();
      cy.getByData('editor-form')
        .should('be.visible')
        .within(() => {
          cy.getByData('input-from').should('have.value', 'SK');
          cy.getByData('input-to').should('have.value', 'CZ');
          cy.getByData('input-time').should('have.value', `${h}:${min}`);
          cy.getByData('input-date').should('have.value', date);
        });
      cy.getByData('input-time').clear().type('1234').should('have.value', '1234');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.checkErrorMessage('Niepoprawny format godziny');
      cy.getByData('input-time').clear().type('12:34').should('have.value', '12:34');
      cy.getByData('input-date').clear().type('0607.2019').should('have.value', '0607.2019');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.checkErrorMessage('Niepoprawny format daty');
      cy.getByData('input-date').clear().type('06.07.2019').should('have.value', '06.07.2019');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      //wait for app's state to update
      cy.wait(1000);
      cy.get('@last').should('contain', '12:34').and('contain', '06.07.2019');
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
