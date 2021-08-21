const { expect } = require('@playwright/test');

class CommonElements {
  constructor(page) {
    this.page = page;
  }

  async checkGuestNavbar() {
    const guestNavbar = await this.page.waitForSelector('data-test=guestNavbar');
    const loginLink = await guestNavbar.$('a >> text="Zaloguj"');
    const registerLink = await guestNavbar.$('a >> text="Zarejestruj"');
    expect(await guestNavbar.isVisible()).toBe(true);
    expect(await loginLink.isVisible()).toBe(true);
    expect(await loginLink.getAttribute('href')).toEqual('/signin');
    expect(await registerLink.isVisible()).toBe(true);
    expect(await registerLink.getAttribute('href')).toEqual('/signup');
  }

  async checkUserNavbar(username) {
    const userNavbar = await this.page.waitForSelector('data-test=userNavbar');
    const userMenuBtn = await userNavbar.$(`button >> text="${username}"`);
    const logoutBtn = await userNavbar.$('button >> text="Wyloguj"');
    expect(await userNavbar.isVisible()).toBe(true);
    expect(await userMenuBtn.isVisible()).toBe(true);
    expect(await userMenuBtn.innerText()).toBe(username);
    expect(await userMenuBtn.isEnabled()).toBe(true);
    expect(await logoutBtn.isVisible()).toBe(true);
    expect(await logoutBtn.innerText()).toBe('Wyloguj');
    expect(await logoutBtn.isEnabled()).toBe(true);
  }

  async checkHeading() {
    const headingLogo = await this.page.$('data-test=headingLogo');
    const headingSubtitle = await this.page.$('data-test=headingSubtitle');
    expect(await headingLogo.isVisible()).toBe(true);
    expect(await headingSubtitle.isVisible()).toBe(true);
    expect(await headingSubtitle.innerText()).toEqual('Rejestruj swoje przekroczenia granic');
  }

  async checkLabelStylesOfFocusedOrFilledInput(input) {
    const name = await input.getAttribute('name');
    const label = await this.page.$(`data-test=label-${name}`);

    await input.focus();
    await label.waitForElementState('stable');
    expect(
      await this.page.$eval(`[data-test=label-${name}]`, e => getComputedStyle(e).fontSize)
    ).toBe('13px');
    expect(await this.page.$eval(`[data-test=label-${name}]`, e => getComputedStyle(e).top)).toBe(
      '-8.5px'
    );
    expect(await this.page.$eval(`[data-test=label-${name}]`, e => getComputedStyle(e).left)).toBe(
      '5px'
    );

    await input.fill('abc');
    expect(await label.getAttribute('class')).toBe('shrink custom-input__label');
  }
}

module.exports = CommonElements;
