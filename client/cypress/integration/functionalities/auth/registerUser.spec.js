describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Signs up with correct data', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password123', 'password123');
    cy.checkUserName('Tester Name');
    cy.checkUserHeader('Tester Name');
    cy.contains('button', 'Wyloguj').click();
    cy.exec('npm run reset:db');
  });

  it("Validates the length of the user's name", () => {
    cy.registerUser(
      "This name is way too long to be a user's name, mate...",
      'testing@test.pl',
      'password123',
      'password123'
    );
    cy.checkErrorMessage('Imię i nazwisko nie może mieć wiecej niż 25 znaków.');
    cy.checkGuestHeader();
  });

  it('Validates the email address', () => {
    cy.registerUser('Tester Name', 'notanemailaddress@test', 'password123', 'password123');
    cy.checkErrorMessage('Podany adres email jest nieprawidłowy.');
    cy.checkGuestHeader();
  });

  it('Validates the length of the password', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'pass1', 'pass1');
    cy.checkErrorMessage('Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.');
    cy.checkGuestHeader();
  });

  it('Checks if password contains at least one number', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password', 'password');
    cy.checkErrorMessage('Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.');
    cy.checkGuestHeader();
  });

  it('Checks if passwords matches', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password123', 'password321');
    cy.checkErrorMessage('Hasła nie są takie same.');
    cy.checkGuestHeader();
  });

  it('Makes sure that all fields are filled in', () => {
    cy.registerUser('', 'testing@test.pl', 'password123', 'password123');
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
    cy.clearAllInputs();
    cy.registerUser('Tester Name', '', 'password123', 'password123');
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
    cy.clearAllInputs();
    cy.registerUser('Tester Name', 'testing@test.pl', '', '');
    cy.checkErrorMessage('Wypełnij wszystkie pola.');
    cy.checkGuestHeader();
  });
});
