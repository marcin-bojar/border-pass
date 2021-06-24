describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Signs up with correct data', () => {
    cy.registerUser(
      Cypress.env('username'),
      Cypress.env('email'),
      Cypress.env('password'),
      Cypress.env('password')
    );
    cy.checkUserName(Cypress.env('username'));
    cy.checkUserHeader(Cypress.env('username'));
    cy.contains('button', 'Wyloguj').click();
    cy.exec('npm run reset:db');
  });

  it("Validates the length of the user's name", () => {
    cy.registerUser(
      "This name is way too long to be a user's name, mate...",
      Cypress.env('email'),
      Cypress.env('password'),
      Cypress.env('password')
    );
    cy.checkErrorMessage('Imię i nazwisko nie może mieć wiecej niż 25 znaków.');
    cy.checkGuestHeader();
  });

  it('Validates the email address', () => {
    cy.registerUser(
      Cypress.env('username'),
      'notanemailaddress@test',
      Cypress.env('password'),
      Cypress.env('password')
    );
    cy.checkErrorMessage('Podany adres email jest nieprawidłowy.');
    cy.checkGuestHeader();
  });

  it('Validates the length of the password', () => {
    cy.registerUser(Cypress.env('username'), Cypress.env('email'), 'pass1', 'pass1');
    cy.checkErrorMessage('Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.');
    cy.checkGuestHeader();
  });

  it('Checks if password contains at least one number', () => {
    cy.registerUser(Cypress.env('username'), Cypress.env('email'), 'password', 'password');
    cy.checkErrorMessage('Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.');
    cy.checkGuestHeader();
  });

  it('Checks if passwords matches', () => {
    cy.registerUser(
      Cypress.env('username'),
      Cypress.env('email'),
      Cypress.env('password'),
      'password321'
    );
    cy.checkErrorMessage('Hasła nie są takie same.');
    cy.checkGuestHeader();
  });

  it('Makes sure that all fields are filled in', () => {
    cy.registerUser('', Cypress.env('email'), Cypress.env('password'), Cypress.env('password'));
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
    cy.clearAllInputs();
    cy.registerUser(Cypress.env('username'), '', Cypress.env('password'), Cypress.env('password'));
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
    cy.clearAllInputs();
    cy.registerUser(Cypress.env('username'), Cypress.env('email'), '', '');
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
  });
});
