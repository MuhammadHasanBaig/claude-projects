const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;

test.describe('Signup Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.evaluate(() => navigate('signup'));
    await page.waitForSelector('#signupForm');
  });

  test('renders signup form with all required fields', async ({ page }) => {
    await expect(page.locator('#signupFirst')).toBeVisible();
    await expect(page.locator('#signupLast')).toBeVisible();
    await expect(page.locator('#signupEmail')).toBeVisible();
    await expect(page.locator('#signupPhone')).toBeVisible();
    await expect(page.locator('#signupPassword')).toBeVisible();
    await expect(page.locator('#signupConfirm')).toBeVisible();
    await expect(page.locator('#signupTerms')).toBeVisible();
    await expect(page.locator('#signupBtn')).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.click('#signupBtn');
    await expect(page.locator('#signupFirstErr')).not.toHaveClass(/hidden/);
    await expect(page.locator('#signupLastErr')).not.toHaveClass(/hidden/);
    await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
    await expect(page.locator('#signupPasswordErr')).not.toHaveClass(/hidden/);
  });

  test('shows error when passwords do not match', async ({ page }) => {
    await page.fill('#signupFirst', 'John');
    await page.fill('#signupLast', 'Doe');
    await page.fill('#signupEmail', 'john@test.com');
    await page.fill('#signupPassword', 'password123');
    await page.fill('#signupConfirm', 'different123');
    await page.check('#signupTerms');
    await page.click('#signupBtn');
    await expect(page.locator('#signupConfirmErr')).not.toHaveClass(/hidden/);
  });

  test('shows error for password less than 6 characters', async ({ page }) => {
    await page.fill('#signupFirst', 'John');
    await page.fill('#signupLast', 'Doe');
    await page.fill('#signupEmail', 'john@test.com');
    await page.fill('#signupPassword', 'abc');
    await page.fill('#signupConfirm', 'abc');
    await page.check('#signupTerms');
    await page.click('#signupBtn');
    await expect(page.locator('#signupPasswordErr')).not.toHaveClass(/hidden/);
  });

  test('shows error when terms not checked', async ({ page }) => {
    await page.fill('#signupFirst', 'John');
    await page.fill('#signupLast', 'Doe');
    await page.fill('#signupEmail', 'john@test.com');
    await page.fill('#signupPassword', 'password123');
    await page.fill('#signupConfirm', 'password123');
    // Do NOT check terms
    await page.click('#signupBtn');
    await expect(page.locator('#signupTermsErr')).not.toHaveClass(/hidden/);
  });

  test('shows error for invalid email format', async ({ page }) => {
    await page.fill('#signupFirst', 'John');
    await page.fill('#signupLast', 'Doe');
    await page.fill('#signupEmail', 'invalidemail');
    await page.fill('#signupPassword', 'password123');
    await page.fill('#signupConfirm', 'password123');
    await page.check('#signupTerms');
    await page.click('#signupBtn');
    await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
  });

  test('successfully creates a new account with valid data', async ({ page }) => {
    const uniqueEmail = `test_${Date.now()}@example.com`;
    await page.fill('#signupFirst', 'Jane');
    await page.fill('#signupLast', 'Smith');
    await page.fill('#signupEmail', uniqueEmail);
    await page.fill('#signupPhone', '+1 (555) 123-4567');
    await page.fill('#signupPassword', 'securepass1');
    await page.fill('#signupConfirm', 'securepass1');
    await page.check('#signupTerms');
    await page.click('#signupBtn');
    // Wait for account creation (simulated delay ~900ms)
    await page.waitForTimeout(1200);
    // After signup, user should be logged in — dashboard nav visible
    await expect(page.locator('#navDashboardItem')).not.toHaveClass(/hidden/);
  });

  test('shows error when email already registered', async ({ page }) => {
    // demo@mediconnect.com is a pre-existing account
    await page.fill('#signupFirst', 'Demo');
    await page.fill('#signupLast', 'User');
    await page.fill('#signupEmail', 'demo@mediconnect.com');
    await page.fill('#signupPassword', 'demo123');
    await page.fill('#signupConfirm', 'demo123');
    await page.check('#signupTerms');
    await page.click('#signupBtn');
    await page.waitForTimeout(1200);
    await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
  });

  test('role selector defaults to patient', async ({ page }) => {
    const checkedRole = await page.$eval(
      'input[name="role"]:checked',
      el => el.value
    );
    expect(checkedRole).toBe('patient');
  });
});
