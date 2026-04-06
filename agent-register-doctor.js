/**
 * MediConnect Agent — Doctor Registration
 * → Opens live website and registers a new doctor account.
 * Run: node agent-register-doctor.js
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

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   🩺 MediConnect — Doctor Registration Agent');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

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

  /* ── STEP 3: Select Doctor Role ─────────────────────── */
  console.log('👨‍⚕️ STEP 3: Selecting role as Doctor...');
  // Radio input is hidden — click the visible label instead
  await page.click('label[for="roleDoctor"]');
  await page.waitForTimeout(1500);
  console.log('   ✓ Role set to Doctor!\n');

  /* ── STEP 4: Fill Registration Form ─────────────────── */
  console.log('✍️  STEP 4: Filling in doctor details...');

  console.log('   → First Name: Michael');
  await page.fill('#signupFirst', 'Michael');
  await page.waitForTimeout(800);

  console.log('   → Last Name: Carter');
  await page.fill('#signupLast', 'Carter');
  await page.waitForTimeout(800);

  const email = `dr.michael.carter.${Date.now()}@hospital.com`;
  console.log(`   → Email: ${email}`);
  await page.fill('#signupEmail', email);
  await page.waitForTimeout(800);

  console.log('   → Phone: +1 (555) 312-7890');
  await page.fill('#signupPhone', '+1 (555) 312-7890');
  await page.waitForTimeout(800);

  console.log('   → Password: ********');
  await page.fill('#signupPassword', 'Doctor@12345');
  await page.waitForTimeout(800);

  console.log('   → Confirm Password: ********');
  await page.fill('#signupConfirm', 'Doctor@12345');
  await page.waitForTimeout(800);

  console.log('   → Accepting Terms & Conditions');
  await page.check('#signupTerms');
  await page.waitForTimeout(1000);
  console.log('   ✓ All fields filled!\n');

  /* ── STEP 5: Submit Registration ────────────────────── */
  console.log('🚀 STEP 5: Submitting doctor registration...');
  await page.click('#signupBtn');
  await page.waitForTimeout(2500);
  await page.waitForSelector('#navDashboardItem:not(.hidden)', { timeout: 8000 });
  console.log('   ✓ Doctor account created & logged in!\n');

  /* ── STEP 6: Go to Dashboard ────────────────────────── */
  console.log('📊 STEP 6: Opening My Appointments dashboard...');
  await page.evaluate(() => navigate('dashboard'));
  await page.waitForSelector('.dashboard-page, .dashboard-container, #app', { timeout: 5000 });
  await page.waitForTimeout(2500);
  console.log('   ✓ Dashboard loaded!\n');

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   🎉 DOCTOR REGISTERED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Name   : Dr. Michael Carter');
  console.log('   Email  : ' + email);
  console.log('   Role   : Doctor');
  console.log('   Phone  : +1 (555) 312-7890');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Keep browser open for 15 seconds so user can see the result
  await page.waitForTimeout(15000);
  await browser.close();
})();
