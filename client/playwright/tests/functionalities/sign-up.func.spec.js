const { test, expect } = require('@playwright/test');
const resetDB = require('../../../db-manager/resetDB');
const seedDB = require('../../../db-manager/seedDB');

const TestData = require('../../utils/testData');
const SignUpPage = require('../../pages/sign-up.page');
const CommonTests = require('../../utils/commonTests');
const { wrongEmails } = require('../../utils/testData');

test.describe('Sign up functionality', () => {
  const { newUserData, userData, wrongPasswords } = TestData;

  test.beforeAll(async () => {
    await resetDB();
    await seedDB();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('Registers new user with correct data', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);
    await signUpPage.registerUser(
      newUserData.username,
      newUserData.email,
      newUserData.password,
      newUserData.password
    );
    await commonTests.checkSpinners(2);
    await commonTests.checkUserNavbar(newUserData.username);
  });

  test('Not registers new user if email address is already taken', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);

    await signUpPage.registerUser(
      userData.username,
      userData.email,
      userData.password,
      userData.password
    );
    await commonTests.checkSpinners(2);
    expect(await commonTests.isErrorMessageVisible('Podany adres email jest już w użyciu.')).toBe(
      true
    );
  });

  test('Requires all fields to be filled in', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);

    // no username
    await signUpPage.registerUser('', userData.email, userData.password, userData.password);
    expect(await commonTests.isErrorMessageVisible('Wypełnij wszystkie pola.')).toBe(true);
    await page.reload();
    // no email
    await signUpPage.registerUser(userData.username, '', userData.password, userData.password);
    expect(await commonTests.isErrorMessageVisible('Wypełnij wszystkie pola.')).toBe(true);
    await page.reload();
    // no password
    await signUpPage.registerUser(userData.username, userData.email, '', '');
    expect(await commonTests.isErrorMessageVisible('Wypełnij wszystkie pola.')).toBe(true);
    await page.reload();
    // none filled in
    await signUpPage.registerUser('', '', '', '');
    expect(await commonTests.isErrorMessageVisible('Wypełnij wszystkie pola.')).toBe(true);
  });

  test('Checks if passwords match', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);
    // 1st case
    await signUpPage.registerUser(
      userData.username,
      userData.email,
      userData.password,
      userData.password.toUpperCase()
    );
    expect(await commonTests.isErrorMessageVisible('Hasła nie są takie same.')).toBe(true);
    await page.reload();
    // 2nd case
    await signUpPage.registerUser(userData.username, userData.email, userData.password, '');
    expect(await commonTests.isErrorMessageVisible('Hasła nie są takie same.')).toBe(true);
    await page.reload();
    // 3rd case
    await signUpPage.registerUser(userData.username, userData.email, '', userData.password);
    expect(await commonTests.isErrorMessageVisible('Hasła nie są takie same.')).toBe(true);
    await page.reload();
    // 4th case
    await signUpPage.registerUser(
      userData.username,
      userData.email,
      userData.password.substring(0, 4),
      userData.password
    );
    expect(await commonTests.isErrorMessageVisible('Hasła nie są takie same.')).toBe(true);
    await page.reload();
    // 5th case - positive
    await signUpPage.registerUser(
      userData.username,
      userData.email,
      userData.password,
      userData.password
    );
    expect(await commonTests.isErrorMessageVisible('Podany adres email jest już w użyciu.')).toBe(
      true
    );
  });

  test('Validates the password', async ({ page }) => {
    await resetDB();
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);

    for (let passwd of wrongPasswords) {
      await signUpPage.registerUser(userData.username, userData.email, passwd, passwd);
      expect(
        await commonTests.isErrorMessageVisible(
          'Hasło musi składać się z co najmniej pięciu liter i jednej cyfry.'
        )
      ).toBe(true);
      await page.reload();
    }
  });

  test('Validates the username', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);

    // too short (less than 3 chars)
    await signUpPage.registerUser('mb', userData.email, userData.password, userData.password);
    expect(
      await commonTests.isErrorMessageVisible('Imię i nazwisko nie może być krótsze niż 3 znaki.')
    ).toBe(true);

    await page.reload();

    // too long (more than 25 chars)
    await signUpPage.registerUser(
      'This user name is way too long, mate...',
      userData.email,
      userData.password,
      userData.password
    );
    expect(
      await commonTests.isErrorMessageVisible('Imię i nazwisko nie może mieć wiecej niż 25 znaków.')
    ).toBe(true);
  });
});
