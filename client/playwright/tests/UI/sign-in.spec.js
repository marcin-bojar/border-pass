const { test, expect } = require('@playwright/test');
const SignInPage = require('../../pages/sign-in.page');
const CommonTests = require('../../utils/commonTests');

test.describe('Sign in page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('It renders the Sign in page correctly', async ({ page }) => {
    const commonTests = new CommonTests(page);
    const signInPage = new SignInPage(page);

    await commonTests.checkGuestNavbar();
    await commonTests.checkHeading();

    // content
    const title = await signInPage.title;
    const emailInput = await signInPage.emailInput;
    const emailLabel = await signInPage.emailLabel;
    const passwordInput = await signInPage.passwordInput;
    const passwordLabel = await signInPage.passwordLabel;
    const submitBtn = await signInPage.submitBtn;

    expect(await title.innerText()).toBe('Zaloguj się');
    expect(await emailInput.isVisible()).toBe(true);
    expect(await emailLabel.isVisible()).toBe(true);
    expect(await emailLabel.innerText()).toBe('Email');
    expect(await passwordInput.isVisible()).toBe(true);
    expect(await passwordLabel.isVisible()).toBe(true);
    expect(await passwordLabel.innerText()).toBe('Hasło');
    expect(await submitBtn.isVisible()).toBe(true);
    expect(await submitBtn.isEnabled()).toBe(true);
    expect(await submitBtn.innerText()).toBe('Zaloguj');
  });

  test("Check the inputs' labels", async ({ page, browserName }) => {
    const emailInput = await signInPage.emailInput;
    const passwordInput = await signInPage.passwordInput;

    test.skip(
      browserName === 'firefox' || browserName === 'webkit',
      'Checking styles not supported'
    );
    const commonTests = new CommonTests(page);

    await commonTests.checkLabelStylesOfFocusedOrFilledInput(emailInput);
    await commonTests.checkLabelStylesOfFocusedOrFilledInput(passwordInput);
  });
});
