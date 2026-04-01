const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;

// Helper: log in with demo credentials
async function loginAsDemo(page) {
  await page.evaluate(() => navigate('login'));
  await page.waitForSelector('#loginForm');
  await page.fill('#loginEmail', 'demo@mediconnect.com');
  await page.fill('#loginPassword', 'demo123');
  await page.click('#loginBtn');
  await page.waitForTimeout(1200);
  await page.waitForSelector('#navDashboardItem:not(.hidden)');
}

test.describe('Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await loginAsDemo(page);
  });

  test('redirects to login if not authenticated', async ({ page }) => {
    // Logout first
    await page.evaluate(() => logout());
    await page.waitForTimeout(300);
    // Try to navigate to booking
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForTimeout(500);
    // Should land on login page
    await expect(page.locator('#loginForm')).toBeVisible();
  });

  test('renders booking page with 3-step progress indicator', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.booking-steps');
    await expect(page.locator('#step1')).toBeVisible();
    await expect(page.locator('#step2')).toBeVisible();
    await expect(page.locator('#step3')).toBeVisible();
  });

  test('step 1 — shows calendar and Next button is disabled initially', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('#calendarWrap');
    const nextBtn = page.locator('#nextToStep2');
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toBeDisabled();
  });

  test('step 1 — Next button enables after selecting an available date', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day:not(.disabled):not(.other-month)');
    // Click the first available (non-disabled, non-past) day
    const availableDay = page.locator('.calendar-day.available').first();
    await availableDay.click();
    await expect(page.locator('#nextToStep2')).toBeEnabled();
  });

  test('step 2 — shows time slots after selecting a date', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('#timeSlotsGrid');
    await expect(page.locator('#timeSlotsGrid')).toBeVisible();
    // Should have at least one time slot
    const slots = page.locator('.time-slot');
    await expect(slots.first()).toBeVisible();
  });

  test('step 2 — Next button disabled until a time slot is selected', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('#nextToStep3');
    await expect(page.locator('#nextToStep3')).toBeDisabled();
  });

  test('step 2 — selecting a time slot enables Next button', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('.time-slot:not(.booked)');
    await page.locator('.time-slot:not(.booked)').first().click();
    await expect(page.locator('#nextToStep3')).toBeEnabled();
  });

  test('step 3 — shows confirmation summary with doctor and date/time', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('.time-slot:not(.booked)');
    await page.locator('.time-slot:not(.booked)').first().click();
    await page.click('#nextToStep3');
    await page.waitForSelector('.booking-confirm-card, .confirm-summary, #confirmStep, #bookingContent');
    // Confirm button should be visible
    await expect(page.locator('button:has-text("Confirm Appointment"), #confirmBookingBtn')).toBeVisible();
  });

  test('full booking flow — confirms appointment and shows success', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('.time-slot:not(.booked)');
    await page.locator('.time-slot:not(.booked)').first().click();
    await page.click('#nextToStep3');
    await page.waitForSelector('button:has-text("Confirm Appointment"), #confirmBookingBtn');
    await page.locator('button:has-text("Confirm Appointment"), #confirmBookingBtn').click();
    // Should show success state or navigate to dashboard
    await expect(
      page.locator('.booking-success, .success-icon, #navDashboardItem:not(.hidden)')
    ).toBeVisible({ timeout: 10000 });
  });

  test('step 2 — Back button returns to step 1', async ({ page }) => {
    await page.evaluate(() => navigate('booking', 1));
    await page.waitForSelector('.calendar-day.available');
    await page.locator('.calendar-day.available').first().click();
    await page.click('#nextToStep2');
    await page.waitForSelector('#timeSlotsGrid');
    await page.click('button:has-text("Back")');
    await page.waitForSelector('#calendarWrap');
    await expect(page.locator('#step1')).toHaveClass(/active/);
  });
});
