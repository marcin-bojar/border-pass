describe('Editing trip items', () => {
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

  it('Edits the history item (border pass)', function () {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.getByData('app').then($app => {
        if ($app.find('[data-test=current-country-container]').length > 0) {
          cy.contains('button', 'SK').should('be.visible').click();
          cy.wait('@users');
        } else {
          cy.contains('button', 'SK').should('be.visible').click();
        }
      });
      cy.contains('button', 'CZ').should('be.visible').click();
      cy.wait('@users');
      cy.getByData('toggle-edit').should('be.visible').and('be.enabled').click();
      cy.getByData('history-editor').should('be.visible');
      cy.getByData('history-list').children().should('have.length.gt', 0).last().as('last').click();
      cy.getByData('editor-form')
        .should('be.visible')
        .within(() => {
          cy.getByData('input-from').should('have.value', 'SK');
          cy.getByData('input-to').should('have.value', 'CZ');
          cy.getByData('input-time').should('have.value', `${h}:${min}`);
          cy.getByData('input-date').should('have.value', date);
        });
      cy.getByData('input-from').clear().type('de').should('have.value', 'DE');
      cy.getByData('input-to').clear().type('sk').should('have.value', 'SK');
      cy.getByData('input-time').clear().type('1234').should('have.value', '1234');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.checkErrorMessage('Niepoprawny format godziny');
      cy.getByData('input-time').clear().type('12:34').should('have.value', '12:34');
      cy.getByData('input-date').clear().type('0607.2019').should('have.value', '0607.2019');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.checkErrorMessage('Niepoprawny format daty');
      cy.getByData('input-date').clear().type('06.07.2032').should('have.value', '06.07.2032');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.get('@last')
        .should('contain', 'DE')
        .and('contain', 'SK')
        .and('contain', '12:34')
        .and('contain', '06.07.2032');
    });
  });

  it('Edits the history item (trip start / end)', () => {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.getByData('app').then($app => {
        if ($app.find('[data-test=current-country-container]').length === 0) {
          cy.contains('button', 'PL').should('be.visible').and('be.enabled').click();
        }
      });
      cy.getByData('trip-start-button').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.getByData('trip-start-item')
        .should('have.length.gt', 0)
        .last()
        .as('trip-start')
        .then($tripStart => {
          expect($tripStart).to.contain('Wyjazd z bazy');
          expect($tripStart).to.contain(`${h}:${min}`);
          expect($tripStart).to.contain(min);
          expect($tripStart).to.contain(date);
        });
      cy.getByData('toggle-edit').should('be.visible').should('be.enabled').click();
      cy.getByData('history-editor').should('be.visible');
      cy.get('@trip-start').click();
      cy.getByData('editor-form')
        .should('be.visible')
        .within(() => {
          cy.getByData('input-event')
            .should('be.visible')
            .and('have.value', 'tripStart')
            .and('contain', 'Wyjazd z bazy');
          cy.getByData('input-time').should('be.visible').and('have.value', `${h}:${min}`);
          cy.getByData('input-date').should('be.visible').and('have.value', date);
        });
      cy.getByData('input-event')
        .select('Powrót na bazę')
        .should('have.value', 'tripEnd')
        .and('contain', 'Powrót na bazę');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.getByData('trip-end-item')
        .contains(`${h}:${min} ${date}`)
        .closest('li')
        .then($tripStart => {
          cy.wrap($tripStart).click();
        });
      cy.getByData('input-event')
        .select('Wyjazd z bazy')
        .should('have.value', 'tripStart')
        .and('contain', 'Wyjazd z bazy');
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.getByData('trip-start-item').contains(`${h}:${min} ${date}`).should('be.visible');
    });
  });

  it('Edits the history item (place)', () => {
    cy.getCurrentTimeAndDate().then(({ now, h, min, date }) => {
      cy.clock(now);
      cy.getByData('app').then($app => {
        if ($app.find('[data-test=current-country-container]').length === 0) {
          cy.contains('button', 'PL').should('be.visible').and('be.enabled').click();
        }
      });
      cy.getByData('add-place')
        .should('be.visible')
        .focus()
        .type('zabrze{enter}')
        .should('have.value', 'ZABRZE');
      cy.contains('button', 'ZABRZE').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.getByData('history-item')
        .should('have.length.gt', 0)
        .contains('ZABRZE')
        .closest('li')
        .as('place')
        .should('be.visible')
        .and('contain', `${h}:${min}`)
        .and('contain', date);
      cy.getByData('toggle-edit').should('be.visible').should('be.enabled').click();
      cy.getByData('history-editor').should('be.visible');
      cy.get('@place').click();
      cy.getByData('editor-form')
        .should('be.visible')
        .within(() => {
          cy.getByData('input-place')
            .should('have.value', 'ZABRZE')
            .click()
            .clear()
            .type('szczecin')
            .should('have.value', 'SZCZECIN');
        });
      cy.getByData('confirm-edit').should('be.visible').and('be.enabled').click();
      cy.wait('@users');
      cy.getByData('history-item')
        .should('contain', 'SZCZECIN')
        .and('contain', `${h}:${min}`)
        .and('contain', date);
    });
  });
});
