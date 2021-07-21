describe.only('Send page', () => {
  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.intercept('/api/tables').as('tables');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/');
    cy.fillHistoryList();
    cy.openMenuItem('Wyślij zestawienie');
  });

  it('Renders the Send page correctly', () => {
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.getByData('send-borders-container')
      .should('be.visible')
      .within(() => {
        cy.getByData('title').should('be.visible').and('contain', 'Wysyłanie zestawienia');
        cy.contains(
          'p',
          '1. Wybierz dane z listy. Możesz wybrać zakres danych klikając na pierwszy i ostatni element interesującego Cię zakresu lub zaznaczyć wszystkie elementy.'
        ).should('be.visible');
        cy.contains('p', '2. Wyślij i/lub archiwizuj wybrane dane.').should('be.visible');
        cy.contains('p', 'Dane w archiwum dostępne są przez 6 miesięcy.').should('be.visible');
      });

    cy.contains('button', 'Zaznacz wszystko').should('be.visible').and('be.enabled');
    cy.contains('button', 'Usuń zaznaczenie').should('be.visible').and('be.enabled');
    cy.contains('button', 'Wyślij i archiwizuj').should('be.visible').and('be.not.enabled');
    cy.contains('button', 'Archiwizuj dane').should('be.visible').and('be.not.enabled');
    cy.getByData('history-list')
      .as('history-list')
      .then($historyList => {
        expect($historyList.children('li')).to.have.length(7);
        $historyList.children('li').each((i, item) => expect(item).to.not.have.class('selected'));
      });
    cy.contains('button', 'Zaznacz wszystko').click();
    cy.contains('button', 'Wyślij i archiwizuj').should('be.visible').and('be.enabled');
    cy.contains('button', 'Archiwizuj dane').should('be.visible').and('be.enabled');
    cy.getByData('history-list').then($historyList => {
      $historyList.children('li').each((i, item) => expect(item).to.have.class('selected'));
    });
    // Archive data
    cy.contains('button', 'Archiwizuj dane').click();
    cy.wait('@tables');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Dane zostały zarchiwizowane').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled').click();
    cy.get('@history-list').children().should('have.length', 0);
    // Resore data
    cy.go('back');
    cy.fillHistoryList();
    cy.openMenuItem('Wyślij zestawienie');
    // Send data

    // TODO
  });
});
