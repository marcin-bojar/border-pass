const { test, expect } = require('@playwright/test');
const SignInPage = require('../../pages/sign-in.page');
const CommonElements = require('../../pages/common-elements');

test.describe.only('Sign in page', () => {
  test('It renders the Sign in page correctly', async ({ page }) => {
    const commonElements = new CommonElements(page);
    const signInPage = new SignInPage(page);
    await signInPage.goto();

    await commonElements.checkGuestNavbar();
    await commonElements.checkHeading();

    // content
    const title = await page.$('data-test=title');
    const emailInput = await page.$('data-test=input-email');
    const emailLabel = await page.$('data-test=label-email');
    const passwordInput = await page.$('data-test=input-password');
    const passwordLabel = await page.$('data-test=label-password');
    const submitBtn = await page.$('data-test=submit');

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

    await commonElements.checkLabelStylesOfFocusedOrFilledInput(emailInput);
    await commonElements.checkLabelStylesOfFocusedOrFilledInput(passwordInput);
  });
});
