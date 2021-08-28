const AuthPage = require('./auth.base-page');

module.exports = class SignUpPage extends AuthPage {
  constructor(page) {
    super(page);
  }

  get nameInput() {
    return this.page.$('data-test=input-name');
  }

  get nameLabel() {
    return this.page.$('data-test=label-name');
  }

  get confirmPasswordInput() {
    return this.page.$('data-test=input-confirmPassword');
  }

  get confirmPasswordLabel() {
    return this.page.$('data-test=label-confirmPassword');
  }

  async goto() {
    await super.goto('/signup');
  }

  async registerUser(name, email, password, confirmPassword) {
    const eleNameInput = await this.nameInput;
    const eleEmailInput = await this.emailInput;
    const elePasswordInput = await this.passwordInput;
    const eleConfirmPassword = await this.confirmPasswordInput;
    const eleSubmitBtn = await this.submitBtn;

    await eleNameInput.type(name);
    await eleEmailInput.type(email);
    await elePasswordInput.type(password);
    await eleConfirmPassword.type(confirmPassword);
    await eleSubmitBtn.click();
  }
};
