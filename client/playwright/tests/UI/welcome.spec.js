const { test, expect } = require('@playwright/test');
const CommonElements = require('../../pages/common-elements');

test.describe('Welcome page', () => {
  test('It renders the Welcome page correctly', async ({ page }) => {
    const commonElements = new CommonElements(page);
    await page.goto('/');

    await commonElements.checkGuestNavbar();
    await commonElements.checkHeading();

    //content
    const title = await page.$('data-test=title');
    const paragraphs = await page.$$('data-test=text');
    const contentLoginLink = await paragraphs[0].$('a >> text=Zaloguj się');
    const contentRegisterLink = await paragraphs[1].$('a >> text=Zarejestruj się');
    const guestButton = await paragraphs[2].$('button >> text=Kontynuuj jako gość');

    expect(await title.innerText()).toBe('Witaj w Border Pass!');
    expect(await paragraphs[0].innerText()).toBe(
      'Zaloguj się, aby wczytać swoją historię przekroczeń granic.'
    );
    expect(await paragraphs[1].innerText()).toBe('Zarejestruj się, aby utworzyć nowe konto.');
    expect(await paragraphs[2].innerText()).toBe(
      'Kontynuuj jako gość.\xa0Pamietaj jednak, że Twoja historia przekroczeń granic będzie w tym przypadku zapisywana w pamięci Twojego urządzenia, co grozi utratą danych. Nie będziesz miał również możliwości wysyłania zestawienia do firmy.'
    );
    expect(await contentLoginLink.getAttribute('href')).toBe('/signin');
    expect(await contentRegisterLink.getAttribute('href')).toBe('/signup');
    expect(await guestButton.isEnabled()).toBe(true);
  });
});
