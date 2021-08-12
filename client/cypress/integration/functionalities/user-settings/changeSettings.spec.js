describe('Change users settings functionality', () => {
  const changedName = 'Changed name';
  const changedCompanyName = 'New Company Name';
  const changedEmail = 'changed@test.com';

  before(() => {
    cy.exec('npm run reset:db');
    cy.exec('npm run seed:db');
    cy.loginUserWithoutUI(Cypress.env('email'), Cypress.env('password'));
    cy.visit('/config');
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Changes the user's name", () => {
    cy.intercept('/api/users/*/name').as('name');
    cy.getByData('input-username').clear().type(changedName).should('have.value', changedName);
    cy.getByData('save-user').should('be.enabled').click();
    cy.wait('@name');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Twoje imię i nazwisko zostały zmienione.').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').should('be.enabled').click();
    cy.reload();
    cy.getByData('input-username').should('have.value', changedName);
    cy.getByData('save-user').should('be.not.enabled');
  });

  it("Changes the company's name and email address", () => {
    cy.intercept('/api/users/*/company').as('company');
    cy.getByData('input-company-name')
      .clear()
      .type(changedCompanyName)
      .should('have.value', changedCompanyName);
    cy.getByData('save-company').should('be.enabled').click();
    cy.wait('@company');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Dane firmy zostały zmienione.').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').should('be.enabled').click();
    cy.reload();
    cy.getByData('input-company-name').should('have.value', changedCompanyName);
    cy.getByData('save-company').should('be.not.enabled');
    cy.getByData('input-company-email')
      .clear()
      .type(changedEmail)
      .should('have.value', changedEmail);
    cy.getByData('save-company').should('be.visible').should('be.enabled').click();
    cy.wait('@company');
    cy.contains('h3', 'Informacja').should('be.visible');
    cy.contains('p', 'Dane firmy zostały zmienione.').should('be.visible');
    cy.contains('button', 'Zamknij').should('be.visible').should('be.enabled').click();
    cy.reload();
    cy.getByData('input-company-email').should('have.value', changedEmail);
    cy.getByData('save-company').should('be.not.enabled');
  });

  it('Changes the switch setting', () => {
    cy.intercept('/api/users/*/preferences').as('preferences');
    cy.getByData('switch-places').should('be.not.visible').and('be.checked').closest('div').click();
    cy.getByData('save-preferences').should('be.enabled').click();
    cy.wait('@preferences');
    cy.reload();
    cy.getByData('switch-places').should('be.not.visible').and('be.not.checked');
    cy.getByData('save-preferences').should('be.not.enabled');
  });
});
