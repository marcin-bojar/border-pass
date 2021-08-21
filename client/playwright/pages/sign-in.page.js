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

  async clearInputs() {
    await this.page.fill('data-test=input-email', '');
    await this.page.fill('data-test=input-password', '');
  }

  async isErrorMessageVisible(message) {
    const errorMessage = await this.page.waitForSelector(`text="${message}"`, {
      timeout: 4000,
    });
    return await errorMessage.isVisible();
  }
};
