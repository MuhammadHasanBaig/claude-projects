/**
 * Agent: Register, find a heart-disease doctor, and book April 15.
 * Run: node agent-book-appointment.js
 */

const { chromium } = require('@playwright/test');
const path = require('path');

const APP_URL = `file://${path.resolve(__dirname, 'index.html')}`;

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized']
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  MediConnect Agent Starting...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  await page.goto(APP_URL);
  await page.waitForSelector('#app');
  await page.waitForTimeout(1500);

  /* ── STEP 1: Sign Up ─────────────────────────────────── */
  console.log('\n📋 STEP 1: Opening Sign Up form...');
  await page.evaluate(() => navigate('signup'));
  await page.waitForSelector('#signupForm');
  await page.waitForTimeout(1500);

  console.log('   → Typing First Name: Alex');
  await page.fill('#signupFirst', 'Alex');
  await page.waitForTimeout(600);

  console.log('   → Typing Last Name: Jordan');
  await page.fill('#signupLast', 'Jordan');
  await page.waitForTimeout(600);

  const email = `alex.jordan.${Date.now()}@testmail.com`;
  console.log(`   → Typing Email: ${email}`);
  await page.fill('#signupEmail', email);
  await page.waitForTimeout(600);

  console.log('   → Typing Phone: +1 (555) 987-6543');
  await page.fill('#signupPhone', '+1 (555) 987-6543');
  await page.waitForTimeout(600);

  console.log('   → Typing Password');
  await page.fill('#signupPassword', 'Alex@1234');
  await page.waitForTimeout(600);

  console.log('   → Confirming Password');
  await page.fill('#signupConfirm', 'Alex@1234');
  await page.waitForTimeout(600);

  console.log('   → Checking Terms & Conditions');
  await page.check('#signupTerms');
  await page.waitForTimeout(1000);

  console.log('   → Clicking Create Account...');
  await page.click('#signupBtn');
  await page.waitForTimeout(1500);

  await page.waitForSelector('#navDashboardItem:not(.hidden)', { timeout: 5000 });
  console.log('   ✓ Registered & logged in successfully!');
  await page.waitForTimeout(1500);

  /* ── STEP 2: Find a Cardiologist for Heart Disease ───── */
  console.log('\n🔍 STEP 2: Searching for Heart Disease doctors...');
  await page.evaluate(() => navigate('doctors'));
  await page.waitForSelector('#filterSearch');
  await page.waitForTimeout(1500);

  console.log('   → Typing "heart disease" in search box');
  await page.fill('#filterSearch', 'heart disease');
  await page.waitForTimeout(1500);

  const firstCard = page.locator('.doctor-card').first();
  await expect_visible(firstCard, 'No doctor cards found after search');
  console.log('   ✓ Found cardiologist — Dr. Sarah Mitchell');
  await page.waitForTimeout(2000);

  console.log('   → Clicking Book Appointment...');
  await firstCard.locator('button, a').filter({ hasText: /book/i }).click();
  await page.waitForSelector('.booking-steps', { timeout: 5000 });
  console.log('   ✓ Booking page loaded');
  await page.waitForTimeout(2000);

  /* ── STEP 3: Select April 15 on the Calendar ─────────── */
  console.log('\n📅 STEP 3: Selecting April 15 on the calendar...');
  await page.waitForSelector('#calendarWrap');
  await page.waitForTimeout(1500);

  await ensureCalendarMonth(page, 2026, 4);

  console.log('   → Clicking on day 15');
  await page.evaluate(() => selectDate('2026-04-15'));
  await page.waitForTimeout(1500);

  const nextBtn = page.locator('#nextToStep2');
  await nextBtn.waitFor({ state: 'visible' });
  if (await nextBtn.isDisabled()) {
    throw new Error('Next button still disabled after selecting April 15');
  }
  console.log('   ✓ April 15 selected!');
  await page.waitForTimeout(1500);

  console.log('   → Clicking Next: Choose Time...');
  await nextBtn.click();
  await page.waitForTimeout(1500);

  /* ── STEP 4: Select a Time Slot ──────────────────────── */
  console.log('\n🕐 STEP 4: Selecting a time slot...');
  await page.waitForSelector('#timeSlotsGrid');
  await page.waitForTimeout(1500);

  const slot = page.locator('.time-slot:not(.booked)').first();
  await slot.waitFor({ state: 'visible' });
  const slotText = await slot.textContent();
  console.log(`   → Selecting time: ${slotText.trim()}`);
  await slot.click();
  await page.waitForTimeout(1500);

  console.log('   → Clicking Next: Confirm...');
  await page.locator('#nextToStep3').waitFor({ state: 'visible' });
  await page.click('#nextToStep3');
  await page.waitForTimeout(2000);

  /* ── STEP 5: Confirm Booking ──────────────────────────── */
  console.log('\n✅ STEP 5: Reviewing booking summary...');
  await page.waitForSelector('#confirmBtn', { timeout: 5000 });
  await page.waitForTimeout(2500);

  console.log('   → Clicking Confirm Booking...');
  await page.click('#confirmBtn');
  await page.waitForTimeout(2000);

  await page.waitForSelector('.booking-confirmation, .confirm-icon', { timeout: 8000 });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✓ APPOINTMENT BOOKED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Doctor : Dr. Sarah Mitchell (Cardiology)');
  console.log('  Date   : April 15, 2026');
  console.log(`  Time   : ${slotText.trim()}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Keep browser open for 12 seconds so user can see result
  await page.waitForTimeout(12000);
  await browser.close();
})();

/* ── helpers ──────────────────────────────────────────── */

async function expect_visible(locator, message) {
  const count = await locator.count();
  if (count === 0) throw new Error(message);
}

async function ensureCalendarMonth(page, targetYear, targetMonth) {
  for (let i = 0; i < 12; i++) {
    const header = await page.locator('.calendar h3').textContent();
    const [mon, yr] = header.trim().split(' ');
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const curMonth = months.indexOf(mon) + 1;
    const curYear = parseInt(yr);
    if (curYear === targetYear && curMonth === targetMonth) return;
    if (curYear < targetYear || (curYear === targetYear && curMonth < targetMonth)) {
      await page.click('.cal-nav-btn:last-child');
    } else {
      await page.click('.cal-nav-btn:first-child');
    }
    await page.waitForTimeout(300);
  }
}
