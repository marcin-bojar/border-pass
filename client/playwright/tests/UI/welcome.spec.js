const { test, expect } = require('@playwright/test');

test.describe('Welcome page', () => {
  test('It renders the Welcome page correctly', async ({ page }) => {
    await page.goto('/');

    //navbar
    const guestNavbar = await page.$('data-test=guestNavbar');
    const loginLink = await guestNavbar.$('a >> text=Zaloguj');
    const registerLink = await guestNavbar.$('a >> text=Zarejestruj');
    expect(await guestNavbar.isVisible()).toBe(true);
    expect(await loginLink.isVisible()).toBe(true);
    expect(await loginLink.getAttribute('href')).toEqual('/signin');
    expect(await registerLink.isVisible()).toBe(true);
    expect(await registerLink.getAttribute('href')).toEqual('/signup');

    //heading
    const headingLogo = await page.$('data-test=headingLogo');
    const headingSubtitle = await page.$('data-test=headingSubtitle');
    expect(await headingLogo.isVisible()).toBe(true);
    expect(await headingSubtitle.isVisible()).toBe(true);
    expect(await headingSubtitle.innerText()).toEqual('Rejestruj swoje przekroczenia granic');

    //content
    const title = await page.$('data-test=title');
    const paragraphs = await page.$$('data-test=text');
    const contentLoginLink = await paragraphs[0].$('a >> text=Zaloguj się');
    const contentRegisterLink = await paragraphs[1].$('a >> text=Zarejestruj się');
    const guestButton = await paragraphs[2].$('button >> text=Kontynuuj jako gość');
    expect(await title.innerText()).toEqual('Witaj w Border Pass!');
    expect(await paragraphs[0].innerText()).toEqual(
      'Zaloguj się, aby wczytać swoją historię przekroczeń granic.'
    );
    expect();
    expect(await paragraphs[1].innerText()).toEqual('Zarejestruj się, aby utworzyć nowe konto.');
    expect(await paragraphs[2].innerText()).toEqual(
      'Kontynuuj jako gość.\xa0Pamietaj jednak, że Twoja historia przekroczeń granic będzie w tym przypadku zapisywana w pamięci Twojego urządzenia, co grozi utratą danych. Nie będziesz miał również możliwości wysyłania zestawienia do firmy.'
    );
    expect(await contentLoginLink.getAttribute('href')).toEqual('/signin');
    expect(await contentRegisterLink.getAttribute('href')).toEqual('/signup');
    expect(await guestButton.isEnabled()).toBe(true);
  });
});
