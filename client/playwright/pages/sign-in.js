module.exports = class SignInPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/signin');
  }

  async loginUser(email, password) {
    await this.page.type('data-test=input-email', email);
    await this.page.type('data-test=input-password', password);
    await this.page.click('data-test=submit');
  }
};
