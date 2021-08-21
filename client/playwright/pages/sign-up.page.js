module.exports = class SignUpPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/signup');
  }

  async registerUser(name, email, password, confirmPassword) {
    await this.page.type('data-test=input-name', name);
    await this.page.type('data-test=input-email', email);
    await this.page.type('data-test=input-password', password);
    await this.page.type('data-test=input-confirmPassword', confirmPassword);
    await this.page.click('data-test=submit');
  }
};
