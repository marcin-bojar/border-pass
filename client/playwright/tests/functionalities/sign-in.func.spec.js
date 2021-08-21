const { test, expect } = require('@playwright/test');
const seedDB = require('../../../db-manager/seedDB');
const resetDB = require('../../../db-manager/resetDB');

const SignInPage = require('../../pages/sign-in.page');
const TestData = require('../../utils/testData');
const CommonElements = require('../../pages/common-elements');

test.describe('Log in functionality', () => {
  const { userData } = TestData;

  test.beforeAll(async () => {
    await resetDB();
    await seedDB();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('It logs in with correct data', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const commonElements = new CommonElements(page);
    await signInPage.loginUser(userData.email, userData.password);

    await commonElements.checkUserNavbar(userData.username);
  });

  test("It doesn't log in with incorrect password", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.loginUser(userData.email, 'wrongPassword');

    expect(await signInPage.isErrorMessageVisible('Podane dane logowania są błędne.')).toBe(true);
  });

  test("It doesn't log in with incorrect email", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.loginUser('wrong@test.pl', userData.password);

    expect(await signInPage.isErrorMessageVisible('Podany użytkownik nie istnieje.')).toBe(true);
  });

  test("It doesn't log in without email and password", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await page.click('data-test=submit');
    expect(await signInPage.isErrorMessageVisible('Podany adres email jest nieprawidłowy.')).toBe(
      true
    );
  });

  test('It validates the email address', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const { wrongEmails } = TestData;

    for (let i = 0; i < wrongEmails.length; i++) {
      await signInPage.loginUser(wrongEmails[i], userData.password);
      expect(await signInPage.isErrorMessageVisible('Podany adres email jest nieprawidłowy.')).toBe(
        true
      );
      await signInPage.clearInputs();
    }
  });

  test('Email address input is not case sensitive', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const commonElements = new CommonElements(page);
    await signInPage.loginUser('TESting@test.pl', userData.password);

    await commonElements.checkUserNavbar(userData.username);
  });
});
