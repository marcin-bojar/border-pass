module.exports = class SignInPage {
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
    return this.page.$('data-test=input-label');
  }

  get passwordInput() {
    return this.page.$('data-test=input-password');
  }

  get passwordLabel() {
    return this.page.$('data-test=input-label');
  }

  get submitBtn() {
    return this.page.$('data-test=submit');
  }
  get passwordInput() {
    return this.page.$('data-test=input-password');
  }

  async goto() {
    await this.page.goto('/signin');
  }

  async loginUser(email, password) {
    const eleEmailInput = await this.emailInput;
    const elePasswordInput = await this.passwordInput;
    const eleSubmitBtn = await this.submitBtn;
    await eleEmailInput.type(email);
    await elePasswordInput.type(password);
    await eleSubmitBtn.click();
  }

  async clearInputs() {
    const inputs = await this.page.$$('input');

    for (let input of inputs) {
      await input.fill('');
    }
  }
};
