const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    // Navigate to login page
    await page.evaluate(() => navigate('login'));
    await page.waitForSelector('#loginForm');
  });

  test('renders login form with all fields', async ({ page }) => {
    await expect(page.locator('#loginEmail')).toBeVisible();
    await expect(page.locator('#loginPassword')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.click('#loginBtn');
    await expect(page.locator('#loginEmailErr')).not.toHaveClass(/hidden/);
    await expect(page.locator('#loginPasswordErr')).not.toHaveClass(/hidden/);
  });

  test('shows error for invalid email format', async ({ page }) => {
    await page.fill('#loginEmail', 'notanemail');
    await page.fill('#loginPassword', 'somepassword');
    await page.click('#loginBtn');
    await expect(page.locator('#loginEmailErr')).not.toHaveClass(/hidden/);
  });

  test('shows error for wrong credentials', async ({ page }) => {
    await page.fill('#loginEmail', 'wrong@email.com');
    await page.fill('#loginPassword', 'wrongpassword');
    await page.click('#loginBtn');
    // Wait for the simulated delay
    await page.waitForTimeout(1200);
    await expect(page.locator('#loginGeneralErr')).not.toHaveClass(/hidden/);
  });

  test('logs in successfully with demo credentials', async ({ page }) => {
    await page.fill('#loginEmail', 'demo@mediconnect.com');
    await page.fill('#loginPassword', 'demo123');
    await page.click('#loginBtn');
    // Wait for login to complete (has simulated delay)
    await page.waitForTimeout(1200);
    // After login, dashboard nav item should be visible
    await expect(page.locator('#navDashboardItem')).not.toHaveClass(/hidden/);
  });

  test('password toggle shows/hides password text', async ({ page }) => {
    await page.fill('#loginPassword', 'mypassword');
    await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'password');
    // Click the eye toggle button
    await page.click('.form-input-toggle');
    await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'text');
    await page.click('.form-input-toggle');
    await expect(page.locator('#loginPassword')).toHaveAttribute('type', 'password');
  });

  test('login button shows loading state while processing', async ({ page }) => {
    await page.fill('#loginEmail', 'demo@mediconnect.com');
    await page.fill('#loginPassword', 'demo123');
    await page.click('#loginBtn');
    // Button should be disabled during processing
    await expect(page.locator('#loginBtn')).toBeDisabled();
  });
});
