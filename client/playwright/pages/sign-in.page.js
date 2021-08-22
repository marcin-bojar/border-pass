const AuthPage = require('./auth.base-page');

module.exports = class SignInPage extends AuthPage {
  constructor(page) {
    super(page);
  }

  async goto() {
    await super.goto('/signin');
  }

  async loginUser(email, password) {
    const eleEmailInput = await this.emailInput;
    const elePasswordInput = await this.passwordInput;
    const eleSubmitBtn = await this.submitBtn;

    await eleEmailInput.type(email);
    await elePasswordInput.type(password);
    await eleSubmitBtn.click();
  }
};
