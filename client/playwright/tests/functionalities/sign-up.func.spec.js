const { test, expect } = require('@playwright/test');
const resetDB = require('../../../db-manager/resetDB');

const TestData = require('../../utils/testData');
const SignUpPage = require('../../pages/sign-up.page');
const CommonTests = require('../../utils/commonTests');

test.describe('Sign up functionality', () => {
  const { newUserData } = TestData;

  test.beforeAll(async () => {
    await resetDB();
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
});
