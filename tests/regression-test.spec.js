import { test, expect } from '@playwright/test';

test('basic Regression: Register and login @regression', async ({ page }) => {
  await page.goto('https://muhammadhasanbaig.github.io/claude-projects/');
  await page.locator('#navSignupItem').getByRole('link', { name: 'Sign Up' }).click();
  await page.getByRole('textbox', { name: 'John' }).click();
  await page.getByRole('textbox', { name: 'John' }).fill('Hasan');
  await page.getByRole('textbox', { name: 'John' }).press('Tab');
  await page.getByRole('textbox', { name: 'Smith' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Smith' }).press('Tab');
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'your@email.com' }).press('Tab');
  await page.getByRole('textbox', { name: '03001234567' }).fill('12345678901');
  await page.getByRole('textbox', { name: '03001234567' }).press('Tab');
  await page.getByRole('textbox', { name: 'At least 6 characters' }).fill('12345678');
  await page.getByRole('textbox', { name: 'At least 6 characters' }).press('Tab');
  await page.getByRole('textbox', { name: 'Repeat password' }).click();
  await page.getByRole('textbox', { name: 'Repeat password' }).fill('12345678');
  await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).check();
  await page.getByRole('button', { name: ' Create Account' }).click();
  await page.locator('#navLinks').getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.locator('#navLoginItem').getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: ' Sign In' }).click();
});