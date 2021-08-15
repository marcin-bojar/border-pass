const { test, expect } = require('@playwright/test');
const seedDB = require('../../../db-manager/seedDB');
const resetDB = require('../../../db-manager/resetDB');

const testData = {
  email: 'testing@test.pl',
  password: 'password123',
  username: 'Tester Name',
};

test.describe('Log in functionality', () => {
  test.beforeAll(async () => {
    await resetDB();
    await seedDB();
  });

  test.only('It logs in with correct data', async ({ page }) => {
    await page.goto('/signin');

    // enter email
    const emailInput = await page.$('data-test=input-email');
    const passwordInput = await page.$('data-test=input-password');
    await emailInput.fill(testData.email);
    expect(await emailInput.inputValue()).toEqual(testData.email);

    // enter password
    await passwordInput.fill(testData.password);
    expect(await passwordInput.inputValue()).toEqual(testData.password);

    // submit form
    await (await page.$('data-test=submit')).click();

    // verify that user is logged in
    const userNavbar = await page.waitForSelector('data-test=userNavbar');
    expect(await userNavbar.innerText()).toContain(testData.username);
    expect(await userNavbar.innerText()).toContain('Wyloguj');
  });
});
