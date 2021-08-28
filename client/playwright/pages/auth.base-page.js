module.exports = class AuthPage {
  constructor(page) {
    this.page = page;
  }

  get title() {
    return this.page.$('data-test=title');
  }

  get emailInput() {
    return this.page.$('data-test=input-email');
  }

  get emailLabel() {
    return this.page.$('data-test=label-email');
  }

  get passwordInput() {
    return this.page.$('data-test=input-password');
  }

  get passwordLabel() {
    return this.page.$('data-test=label-password');
  }

  get submitBtn() {
    return this.page.$('data-test=submit');
  }

  get getAllInputs() {
    return this.page.$$('input');
  }

  async goto(path) {
    await this.page.goto(path);
  }

  async clearInputs() {
    const inputs = await this.page.$$('input');

    for (let input of inputs) {
      await input.fill('');
    }
  }
};
