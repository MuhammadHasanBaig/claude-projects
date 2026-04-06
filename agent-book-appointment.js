/**
 * MediConnect Agent
 * → Opens live website, registers a patient, books a doctor appointment.
 * Run: node agent-book-appointment.js
 */

const { chromium } = require('@playwright/test');

const APP_URL = 'https://muhammadhasanbaig.github.io/claude-projects/';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized']
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   🤖 MediConnect Automation Agent Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  /* ── STEP 1: Open Website ───────────────────────────── */
  console.log('🌐 STEP 1: Opening live website...');
  console.log(`   → ${APP_URL}`);
  await page.goto(APP_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('#app');
  await page.waitForTimeout(2000);
  console.log('   ✓ Website loaded successfully!\n');

  /* ── STEP 2: Go to Sign Up ──────────────────────────── */
  console.log('📋 STEP 2: Navigating to Sign Up page...');
  await page.evaluate(() => navigate('signup'));
  await page.waitForSelector('#signupForm');
  await page.waitForTimeout(2000);
  console.log('   ✓ Sign Up page opened!\n');

  /* ── STEP 3: Fill Registration Form ────────────────── */
  console.log('✍️  STEP 3: Filling registration form...');

  console.log('   → Selecting role: Patient');
  await page.evaluate(() => {
    const patientRadio = document.querySelector('input[name="role"][value="patient"]');
    if (patientRadio) patientRadio.click();
  });
  await page.waitForTimeout(1000);

  console.log('   → First Name: John');
  await page.fill('#signupFirst', 'John');
  await page.waitForTimeout(800);

  console.log('   → Last Name: Williams');
  await page.fill('#signupLast', 'Williams');
  await page.waitForTimeout(800);

  const email = `john.williams.${Date.now()}@gmail.com`;
  console.log(`   → Email: ${email}`);
  await page.fill('#signupEmail', email);
  await page.waitForTimeout(800);

  console.log('   → Phone: +1 (555) 246-8101');
  await page.fill('#signupPhone', '+1 (555) 246-8101');
  await page.waitForTimeout(800);

  console.log('   → Password: ********');
  await page.fill('#signupPassword', 'John@12345');
  await page.waitForTimeout(800);

  console.log('   → Confirm Password: ********');
  await page.fill('#signupConfirm', 'John@12345');
  await page.waitForTimeout(800);

  console.log('   → Accepting Terms & Conditions');
  await page.check('#signupTerms');
  await page.waitForTimeout(1000);
  console.log('   ✓ Form filled!\n');

  /* ── STEP 4: Submit Registration ────────────────────── */
  console.log('🚀 STEP 4: Submitting registration...');
  await page.click('#signupBtn');
  await page.waitForTimeout(2500);
  await page.waitForSelector('#navDashboardItem:not(.hidden)', { timeout: 8000 });
  console.log('   ✓ Account created & logged in successfully!\n');

  /* ── STEP 5: Search for Heart Disease Doctor ────────── */
  console.log('🔍 STEP 5: Searching for a Heart Disease doctor...');
  await page.evaluate(() => navigate('doctors'));
  await page.waitForSelector('#filterSearch');
  await page.waitForTimeout(2000);

  console.log('   → Typing "heart disease" in search box');
  await page.fill('#filterSearch', 'heart disease');
  await page.waitForTimeout(2000);

  const firstCard = page.locator('.doctor-card').first();
  const cardCount = await page.locator('.doctor-card').count();
  console.log(`   ✓ Found ${cardCount} cardiologist(s)!\n`);

  /* ── STEP 6: Click Book Appointment ─────────────────── */
  console.log('👨‍⚕️ STEP 6: Opening doctor booking page...');
  await firstCard.locator('button, a').filter({ hasText: /book/i }).click();
  await page.waitForSelector('.booking-steps', { timeout: 8000 });
  await page.waitForTimeout(2000);
  console.log('   ✓ Booking page loaded!\n');

  /* ── STEP 7: Select Date (April 15) ─────────────────── */
  console.log('📅 STEP 7: Selecting appointment date — April 15...');
  await page.waitForSelector('#calendarWrap');
  await page.waitForTimeout(1500);

  await ensureCalendarMonth(page, 2026, 4);

  console.log('   → Clicking on April 15');
  await page.evaluate(() => selectDate('2026-04-15'));
  await page.waitForTimeout(1500);

  const nextBtn = page.locator('#nextToStep2');
  await nextBtn.waitFor({ state: 'visible' });
  console.log('   ✓ April 15 selected!\n');

  /* ── STEP 8: Proceed to Time Slot ───────────────────── */
  console.log('➡️  STEP 8: Moving to time slot selection...');
  await nextBtn.click();
  await page.waitForSelector('#timeSlotsGrid', { timeout: 5000 });
  await page.waitForTimeout(2000);
  console.log('   ✓ Time slots loaded!\n');

  /* ── STEP 9: Select a Time Slot ─────────────────────── */
  console.log('🕐 STEP 9: Selecting a time slot...');
  const slot = page.locator('.time-slot:not(.booked)').first();
  await slot.waitFor({ state: 'visible' });
  const slotText = (await slot.textContent()).trim();
  console.log(`   → Selecting: ${slotText}`);
  await slot.click();
  await page.waitForTimeout(1500);
  console.log('   ✓ Time slot selected!\n');

  /* ── STEP 10: Proceed to Confirmation ───────────────── */
  console.log('➡️  STEP 10: Moving to confirmation step...');
  await page.locator('#nextToStep3').waitFor({ state: 'visible' });
  await page.click('#nextToStep3');
  await page.waitForSelector('#confirmBtn', { timeout: 5000 });
  await page.waitForTimeout(2500);
  console.log('   ✓ Booking summary displayed!\n');

  /* ── STEP 11: Confirm Booking ────────────────────────── */
  console.log('✅ STEP 11: Confirming the appointment...');
  await page.click('#confirmBtn');
  await page.waitForTimeout(2000);
  await page.waitForSelector('.booking-confirmation, .confirm-icon', { timeout: 8000 });
  await page.waitForTimeout(1500);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   🎉 APPOINTMENT BOOKED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Patient : John Williams');
  console.log('   Doctor  : Dr. Sarah Mitchell (Cardiology)');
  console.log('   Date    : April 15, 2026');
  console.log(`   Time    : ${slotText}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Keep browser open for 15 seconds so user can see the result
  await page.waitForTimeout(15000);
  await browser.close();
})();

/* ── Helper: navigate calendar to correct month ─────── */
async function ensureCalendarMonth(page, targetYear, targetMonth) {
  for (let i = 0; i < 12; i++) {
    const header = await page.locator('.calendar h3').textContent();
    const [mon, yr] = header.trim().split(' ');
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const curMonth = months.indexOf(mon) + 1;
    const curYear  = parseInt(yr);
    if (curYear === targetYear && curMonth === targetMonth) return;
    if (curYear < targetYear || (curYear === targetYear && curMonth < targetMonth)) {
      await page.click('.cal-nav-btn:last-child');
    } else {
      await page.click('.cal-nav-btn:first-child');
    }
    await page.waitForTimeout(800);
  }
}
