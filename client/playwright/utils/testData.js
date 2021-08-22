module.exports = class TestData {
  static userData = {
    email: 'testing@test.pl',
    password: 'password123',
    username: 'Tester Name',
  };

  static newUserData = {
    ...this.userData,
    email: 'new@test.pl',
  };

  static wrongEmails = [
    'wrong@.pl',
    'wrong@test',
    'wrong@test.',
    'wrong@',
    'wrong',
    'wrong@.s.pl',
    '@wrong.pl',
  ];

  static wrongPasswords = ['marcin', 'mar12', '12345678', '321', 'mbs'];
};
