const { test, expect } = require('@playwright/test');
const seedDB = require('../../../db-manager/seedDB');
const resetDB = require('../../../db-manager/resetDB');

const SignInPage = require('../../pages/sign-in');

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

    // check if error message is displayed
    const message = await page.waitForSelector(`text="Podane dane logowania są błędne."`, {
      timeout: 4000,
    });
    expect(await message.isVisible()).toBe(true);
  });
});
