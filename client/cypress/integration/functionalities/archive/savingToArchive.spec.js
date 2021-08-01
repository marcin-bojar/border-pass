describe.only('Saving items to archive', () => {
  beforeEach(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.intercept('/api/tables').as('tables');
    cy.visit('/');
  });

  it('Saves and displays correctly unsent item in archive', () => {
    cy.getCurrentTimeAndDate().then(({ now: startNow, date: startDate }) => {
      cy.clock(startNow);
      cy.fillHistoryList(['CZ', 'SK']);
      cy.moveTimeForward(76 * 60 * 60 * 1000).then(({ date: finishDate }) => {
        cy.contains('button', 'PL').click();
        cy.openMenuItem('Wyślij zestawienie');
        cy.contains('button', 'Zaznacz wszystko').click();
        cy.contains('button', 'Archiwizuj dane').click();
        cy.wait('@tables');
        cy.contains('h3', 'Informacja').should('be.visible');
        cy.contains('p', 'Dane zostały zarchiwizowane').should('be.visible');
        cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled').click();
        cy.openMenuItem('Archiwum');
        cy.wait('@tables');
        cy.checkUserHeader(Cypress.env('username'));
        cy.checkHeading();
        cy.getByData('archive-list').children('li').as('item').should('have.length', 1);
        cy.contains('button', 'Wysłane').click();
        cy.getByData('archive-list').should('not.exist');
        cy.contains('p', 'Nic tu jeszcze nie masz').should('be.visible');
        cy.contains('button', 'Nie wysłane').click();
        cy.getByData('archive-list').children('li').should('have.length', 1);
        cy.get('@item')
          .should('contain', 'Nie wysłane')
          .and('contain', `${startDate} - ${finishDate}`)
          .click()
          .should('have.class', 'selected');
      });
      cy.getByData('archive-options')
        .should('be.visible')
        .children('button')
        .as('buttons')
        .should('have.length', 2);
      cy.contains('button', 'Wyślij').should('be.visible').and('be.enabled');
      cy.contains('button', 'Usuń').should('be.visible').and('be.enabled');
    });
  });

  it('Saves and displays correctly sent item in archive', () => {
    cy.intercept('api/users/*/send').as('send');
    cy.getCurrentTimeAndDate().then(({ now: startNow, date: startDate }) => {
      cy.clock(startNow);
      cy.fillHistoryList(['CZ', 'SK']);
      cy.moveTimeForward(176 * 60 * 60 * 1000).then(({ date: finishDate }) => {
        cy.contains('button', 'PL').click();
        cy.openMenuItem('Wyślij zestawienie');
        cy.contains('button', 'Zaznacz wszystko').click();
        cy.contains('button', 'Wyślij i archiwizuj').click();
        cy.wait('@send');
        cy.contains('h3', 'Informacja').should('be.visible');
        cy.contains(
          'p',
          'Zestawienie wysłane. Dane z wybranego zakresu zostały zarchiwizowane.'
        ).should('be.visible');
        cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled').click();
        cy.openMenuItem('Archiwum');
        cy.wait('@tables');
        cy.checkUserHeader(Cypress.env('username'));
        cy.checkHeading();
        cy.getByData('archive-list').children('li').as('item').should('have.length', 1);
        cy.contains('button', 'Nie wysłane').click();
        cy.getByData('archive-list').should('not.exist');
        cy.contains('p', 'Nic tu jeszcze nie masz').should('be.visible');
        cy.contains('button', 'Wysłane').click();
        cy.getByData('archive-list').children('li').should('have.length', 1);
        cy.get('@item')
          .should('contain', 'Wysłane')
          .and('contain', `${startDate} - ${finishDate}`)
          .click()
          .should('have.class', 'selected');
      });
      cy.getByData('archive-options')
        .should('be.visible')
        .children('button')
        .as('buttons')
        .should('have.length', 2);
      cy.contains('button', 'Wyślij').should('be.visible').and('be.not.enabled');
      cy.contains('button', 'Usuń').should('be.visible').and('be.enabled');
    });
  });
});
