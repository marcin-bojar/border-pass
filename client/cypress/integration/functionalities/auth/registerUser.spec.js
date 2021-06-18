describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Signs up with correct data', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password123', 'password123');
    cy.checkUserName('Tester Name');
    cy.checkUserHeader();
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
    cy.contains('div', 'Imię i nazwisko nie może mieć wiecej niż 25 znaków.').should(
      'have.class',
      'error-message'
    );
    cy.checkGuestHeader();
  });

  it('Validates the email address', () => {
    cy.registerUser('Tester Name', 'notanemailaddress@test', 'password123', 'password123');
    cy.contains('div', 'Podany adres email jest nieprawidłowy.').should(
      'have.class',
      'error-message'
    );
    cy.checkGuestHeader();
  });

  it('Validates the length of the password', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'pass1', 'pass1');
    cy.contains('div', 'Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.').should(
      'have.class',
      'error-message'
    );
    cy.checkGuestHeader();
  });

  it('Checks if password contains at least one number', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password', 'password');
    cy.contains('div', 'Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.').should(
      'have.class',
      'error-message'
    );
    cy.checkGuestHeader();
  });

  it('Checks if passwords matches', () => {
    cy.registerUser('Tester Name', 'testing@test.pl', 'password123', 'password321');
    cy.contains('div', 'Hasła nie są takie same.').should('have.class', 'error-message');
    cy.checkGuestHeader();
  });

  // it.only('Makes sure that all fields are filled in', () => {
  //   cy.registerUser('          ', 'testing@test.pl', 'password123', 'password123');
  //   cy.contains('div', 'Imię i nazwisko nie może być krótsze niż 3 znaki.').should(
  //     'have.class',
  //     'error-message'
  //   );
  //   cy.checkGuestHeader();
  //   cy.registerUser('Tester Name', ' ', 'password123', 'password321');
  //   cy.registerUser('Tester Name', 'testing@test.pl', '', 'password321');
  //   cy.registerUser('Tester Name', 'testing@test.pl', 'password123', '');
  // });
});
