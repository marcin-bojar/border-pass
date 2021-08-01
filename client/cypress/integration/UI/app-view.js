describe('App view', () => {
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

  it('Renders the app view correctly', () => {
    cy.fillHistoryList(['CZ']);
    cy.checkUserHeader(Cypress.env('username'));
    cy.checkHeading();
    cy.getByData('current-country-container')
      .should('be.visible')
      .within(() => {
        cy.contains('h2', 'Obecnie znajdujesz się w:').should('be.visible');
        cy.contains('button', 'Wyczyść').should('be.visible').and('be.enabled');
      });
    cy.getByData('trip-events-container')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Zdarzenia').should('be.visible');
        cy.contains('button', 'Wyjazd z bazy').should('be.visible').and('be.enabled');
        cy.contains('button', 'Powrót na bazę').should('be.visible').and('be.enabled');
      });
    cy.getByData('country-select-container')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Do jakiego kraju wjeżdżasz?').should('be.visible');
        const countries = ['PL', 'CZ', 'SK', 'DE', 'HU', 'AT', 'NL', 'BE', 'LT', 'LV'];
        countries.forEach(country => {
          cy.contains('button', country).should('be.visible').and('be.enabled');
        });
        cy.contains('button', 'Cofnij').should('be.visible').and('be.enabled');
        cy.contains('button', 'Więcej').should('be.visible').and('be.not.enabled');
        cy.getByData('add-country').siblings('label').should('contain', 'Dodaj kraj');
      });
    cy.getByData('place-select-container')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Punkty podróży').should('be.visible');
        cy.contains(
          'p',
          'Jeśli musisz rejestrować również punkty pośrednie swojej podróży służbowej, takie jak miasta, firmy, przystanki itp, tutaj możesz je dodawać.'
        );
        cy.contains(
          'p',
          'Jeśli nie musisz tego robić, możesz ukryć ten element. W ustawieniach możesz ponownie go włączyć (dostępne dla zalogowanych użytkowników).'
        );
        cy.contains('button', 'Ukryj ten element').should('be.visible').and('be.enabled');
        cy.contains('button', 'Cofnij').should('be.visible').and('be.enabled');
        cy.contains('button', 'Więcej').should('be.visible').and('be.not.enabled');
        cy.getByData('add-place').siblings('label').should('contain', 'Dodaj punkt');
      });
    cy.getByData('history-container')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', 'Historia podróży').should('be.visible');
        cy.contains('button', 'Edytuj').should('be.visible').and('be.enabled');
        cy.contains('button', 'Sortuj wg daty').should('be.visible').and('be.enabled');
        cy.contains('button', 'Wyczyść').should('be.visible').and('be.enabled');
        cy.getByData('history-list').should('be.visible').children('li').should('have.length', 1);
      });
  });

  it("Hides the places' component", () => {
    cy.intercept('/api/users/*/preferences').as('config');
    cy.wait(300);
    cy.contains('button', 'Ukryj ten element').should('be.visible').and('be.enabled').click();
    cy.wait('@config');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Punkty na trasie zostały ukryte').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').and('be.enabled').click();
    cy.getByData('place-select-container').should('not.exist');
  });
});
