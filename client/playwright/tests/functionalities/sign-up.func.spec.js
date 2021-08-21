const { test, expect } = require('@playwright/test');
const resetDB = require('../../../db-manager/resetDB');

const TestData = require('../../utils/testData');
const SignUpPage = require('../../pages/sign-up.page');
const CommonElements = require('../../pages/common-elements');

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
    const commonElements = new CommonElements(page);
    await signUpPage.registerUser(
      newUserData.username,
      newUserData.email,
      newUserData.password,
      newUserData.password
    );
    await commonElements.checkUserNavbar(newUserData.username);
  });
});
