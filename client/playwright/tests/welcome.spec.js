const { test, expect } = require('@playwright/test');

test('Welcome page', async ({ page }) => {
  await page.goto('/');

  //navbar
  expect(await page.$('[data-test=guestNavbar]')).toBeTruthy();
  expect(await page.$('a >> text=Zaloguj')).toBeTruthy();
  expect(await page.$('a >> text=Zarejestruj')).toBeTruthy();

  //heading
  expect(await page.$('[data-test=headingLogo]')).toBeTruthy();
  expect(await page.$('h2 >> text=Rejestruj swoje przekroczenia granic')).toBeTruthy();

  //content
  expect(await page.innerText('h3')).toEqual('Witaj w Border Pass!');
  expect(await page.$('a >> text=Zaloguj się')).toBeTruthy();
  expect(await page.$('a >> text=Zarejestruj się')).toBeTruthy();
  expect(await page.$('button >> text=Kontynuuj jako gość')).toBeTruthy();
  const firstParagraph = await page.$(
    'p >> text=Zaloguj się, aby wczytać swoją historię przekroczeń granic.'
  );
  const secondParagraph = await page.$('p >> text=Zarejestruj się, aby utworzyć nowe konto.');
  const thirdParagraph = await page.$(
    'p >> text=Kontynuuj jako gość. Pamietaj jednak, że Twoja historia przekroczeń granic będzie w tym przypadku zapisywana w pamięci Twojego urządzenia, co grozi utratą danych. Nie będziesz miał również możliwości wysyłania zestawienia do firmy.'
  );
  expect(firstParagraph).toBeTruthy();
  expect(secondParagraph).toBeTruthy();
  expect(thirdParagraph).toBeTruthy();
});
