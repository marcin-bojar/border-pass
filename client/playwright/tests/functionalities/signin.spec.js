const { test, expect } = require('@playwright/test');
const seedDB = require('../../../db-manager/seedDB');
const resetDB = require('../../../db-manager/resetDB');

const SignInPage = require('../../pages/sign-in.page');

const testData = {
  email: 'testing@test.pl',
  password: 'password123',
  username: 'Tester Name',
};

test.describe.only('Log in functionality', () => {
  test.beforeAll(async () => {
    await resetDB();
    await seedDB();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('It logs in with correct data', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.loginUser(testData.email, testData.password);

    // verify that user is logged in
    const userNavbar = await page.waitForSelector('data-test=userNavbar');
    expect(await userNavbar.innerText()).toContain(testData.username);
    expect(await userNavbar.innerText()).toContain('Wyloguj');
  });

  test("It doesn't log in with incorrect password", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.loginUser(testData.email, 'wrongPassword');

    expect(await signInPage.isErrorMessageVisible('Podane dane logowania są błędne.')).toBe(true);
  });

  test("It doesn't log in with incorrect email", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.loginUser('wrong@test.pl', testData.password);

    expect(await signInPage.isErrorMessageVisible('Podany użytkownik nie istnieje.')).toBe(true);
  });

  test.only('It validates the email address', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const wrongEmails = [
      'wrong@pl',
      'wrong@test',
      'wrong@test.',
      'wrong@',
      'wrong',
      'wrong@test.pl',
    ];

    // TODO have to await for response, otherwise it's flaky and passes even with valid email address (different error message displayed)

    for (let i = 0; i < wrongEmails.length; i++) {
      await signInPage.loginUser(wrongEmails[i], testData.password);
      expect(await signInPage.isErrorMessageVisible('Podany adres email jest nieprawidłowy.')).toBe(
        true
      );
      await signInPage.clearInputs();
    }
  });
});
