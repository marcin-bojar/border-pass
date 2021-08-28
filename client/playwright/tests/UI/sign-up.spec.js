const { test, expect } = require('@playwright/test');
const { describe } = require('yargs');

const SignUpPage = require('../../pages/sign-up.page');
const CommonTests = require('../../utils/commonTests');

test.describe('Sign Up page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('Renders the Sign Up page correctly', async ({ page }) => {
    const commonTests = new CommonTests(page);
    const signUpPage = new SignUpPage(page);

    await commonTests.checkGuestNavbar();
    await commonTests.checkHeading();

    // content
    const title = await signUpPage.title;
    const nameInput = await signUpPage.nameInput;
    const nameLabel = await signUpPage.nameLabel;
    const emailInput = await signUpPage.emailInput;
    const emailLabel = await signUpPage.emailLabel;
    const passwordInput = await signUpPage.passwordInput;
    const passwordLabel = await signUpPage.passwordLabel;
    const confirmPasswordInput = await signUpPage.confirmPasswordInput;
    const confirmPasswordLabel = await signUpPage.confirmPasswordLabel;
    const submitBtn = await signUpPage.submitBtn;

    expect(await title.innerText()).toBe('Zarejestruj się');
    expect(await nameInput.isVisible()).toBe(true);
    expect(await nameLabel.isVisible()).toBe(true);
    expect(await nameLabel.innerText()).toBe('Imię i nazwisko');
    expect(await emailInput.isVisible()).toBe(true);
    expect(await emailLabel.isVisible()).toBe(true);
    expect(await emailLabel.innerText()).toBe('Email');
    expect(await passwordInput.isVisible()).toBe(true);
    expect(await passwordLabel.isVisible()).toBe(true);
    expect(await passwordLabel.innerText()).toBe('Hasło');
    expect(await confirmPasswordInput.isVisible()).toBe(true);
    expect(await confirmPasswordLabel.isVisible()).toBe(true);
    expect(await confirmPasswordLabel.innerText()).toBe('Powtórz hasło');
    expect(await submitBtn.isEnabled()).toBe(true);
    expect(await submitBtn.innerText()).toBe('Zarejestruj');
  });

  test('Check the inputs labels', async ({ page, browserName }) => {
    test.skip(
      browserName === 'firefox' || browserName === 'webkit',
      'Checking styles not supported'
    );

    const signUpPage = new SignUpPage(page);
    const commonTests = new CommonTests(page);
    const inputs = await signUpPage.getAllInputs;

    for (let input of inputs) {
      await commonTests.checkLabelStylesOfFocusedOrFilledInput(input);
    }
  });
});
