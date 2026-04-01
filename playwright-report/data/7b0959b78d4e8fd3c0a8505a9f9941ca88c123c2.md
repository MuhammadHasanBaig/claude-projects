# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.js >> Booking Form >> step 3 — shows confirmation summary with doctor and date/time
- Location: tests\booking.spec.js:90:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Confirm Appointment"), #confirmBookingBtn')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Confirm Appointment"), #confirmBookingBtn')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "+ MediConnect" [ref=e4] [cursor=pointer]:
        - /url: "#"
        - generic [ref=e6]: +
        - generic [ref=e7]: MediConnect
      - list [ref=e8]:
        - listitem [ref=e9]:
          - link "Home" [ref=e10] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e11]:
          - link "Find Doctors" [ref=e12] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=e13]:
          - link " My Appointments" [ref=e14] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e15]: 
            - text: My Appointments
        - listitem [ref=e16]:
          - link " Logout" [ref=e17] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e18]: 
            - text: Logout
        - text:  
      - button "" [ref=e20] [cursor=pointer]:
        - generic [ref=e21]: 
  - main [ref=e22]:
    - generic [ref=e24]:
      - button " Back to Profile" [ref=e25] [cursor=pointer]:
        - generic [ref=e26]: 
        - text: Back to Profile
      - heading "Book Appointment" [level=2] [ref=e27]
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e31]: 
          - text: Select Date
        - generic [ref=e32]:
          - generic [ref=e34]: 
          - text: Choose Time
        - generic [ref=e35]:
          - generic [ref=e36]: "3"
          - text: Confirm
      - generic [ref=e37]:
        - generic [ref=e38]:
          - img "Dr. Sarah Mitchell" [ref=e39]
          - generic [ref=e40]:
            - heading "Dr. Sarah Mitchell" [level=3] [ref=e41]
            - paragraph [ref=e42]:
              - generic [ref=e43]: 
              - text: Cardiology · New York Presbyterian Hospital
            - paragraph [ref=e44]: $250 consultation fee
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]: Selected Appointment
              - generic [ref=e49]: Thursday, April 2, 2026
              - generic [ref=e50]: 9:00 AM
            - generic [ref=e51]:
              - button " Change Date" [ref=e52] [cursor=pointer]:
                - generic [ref=e53]: 
                - text: Change Date
              - button " Change Time" [ref=e54] [cursor=pointer]:
                - generic [ref=e55]: 
                - text: Change Time
          - generic [ref=e56]:
            - generic [ref=e57]: 
            - text: Appointment Summary
          - generic [ref=e58]:
            - generic [ref=e59]:
              - generic [ref=e60]: Doctor
              - generic [ref=e61]: Dr. Sarah Mitchell
            - generic [ref=e62]:
              - generic [ref=e63]: Specialization
              - generic [ref=e64]: Cardiology
            - generic [ref=e65]:
              - generic [ref=e66]: Hospital
              - generic [ref=e67]: New York Presbyterian Hospital
            - generic [ref=e68]:
              - generic [ref=e69]: Date
              - generic [ref=e70]: Thursday, April 2, 2026
            - generic [ref=e71]:
              - generic [ref=e72]: Time
              - generic [ref=e73]: 9:00 AM
            - generic [ref=e74]:
              - generic [ref=e75]: Patient
              - generic [ref=e76]: Demo Patient
            - generic [ref=e77]:
              - generic [ref=e78]: Consultation Fee
              - generic [ref=e79]: $250
          - generic [ref=e80]:
            - generic [ref=e81]: 
            - text: Free cancellation available up to 24 hours before your appointment
          - generic [ref=e82]:
            - button " Back" [ref=e83] [cursor=pointer]:
              - generic [ref=e84]: 
              - text: Back
            - button " Confirm Booking — $250" [ref=e85] [cursor=pointer]:
              - generic [ref=e86]: 
              - text: Confirm Booking — $250
  - contentinfo [ref=e87]:
    - generic [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e93]: +
            - generic [ref=e94]: MediConnect
          - paragraph [ref=e95]: Your health, our priority. Connect with top doctors anytime, anywhere.
          - generic [ref=e96]:
            - link "" [ref=e97] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e98]: 
            - link "" [ref=e99] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e100]: 
            - link "" [ref=e101] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e102]: 
            - link "" [ref=e103] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e104]: 
        - generic [ref=e105]:
          - heading "Quick Links" [level=4] [ref=e106]
          - list [ref=e107]:
            - listitem [ref=e108]:
              - link "Home" [ref=e109] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e110]:
              - link "Find Doctors" [ref=e111] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e112]:
              - link "Login" [ref=e113] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e114]:
              - link "Sign Up" [ref=e115] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e116]:
          - heading "Specializations" [level=4] [ref=e117]
          - list [ref=e118]:
            - listitem [ref=e119]:
              - link "Cardiology" [ref=e120] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e121]:
              - link "Dermatology" [ref=e122] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e123]:
              - link "Neurology" [ref=e124] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e125]:
              - link "Orthopedics" [ref=e126] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e127]:
              - link "Pediatrics" [ref=e128] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e129]:
          - heading "Contact" [level=4] [ref=e130]
          - list [ref=e131]:
            - listitem [ref=e132]:
              - generic [ref=e133]: 
              - text: 123 Health Ave, New York
            - listitem [ref=e134]:
              - generic [ref=e135]: 
              - text: +1 (800) MEDI-CON
            - listitem [ref=e136]:
              - generic [ref=e137]: 
              - text: support@mediconnect.com
      - generic [ref=e138]:
        - paragraph [ref=e139]: © 2026 MediConnect. All rights reserved.
        - generic [ref=e140]:
          - link "Privacy Policy" [ref=e141] [cursor=pointer]:
            - /url: "#"
          - link "Terms of Service" [ref=e142] [cursor=pointer]:
            - /url: "#"
          - link "Cookie Policy" [ref=e143] [cursor=pointer]:
            - /url: "#"
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const path = require('path');
  3   | 
  4   | const APP_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;
  5   | 
  6   | // Helper: log in with demo credentials
  7   | async function loginAsDemo(page) {
  8   |   await page.evaluate(() => navigate('login'));
  9   |   await page.waitForSelector('#loginForm');
  10  |   await page.fill('#loginEmail', 'demo@mediconnect.com');
  11  |   await page.fill('#loginPassword', 'demo123');
  12  |   await page.click('#loginBtn');
  13  |   await page.waitForTimeout(1200);
  14  |   await page.waitForSelector('#navDashboardItem:not(.hidden)');
  15  | }
  16  | 
  17  | test.describe('Booking Form', () => {
  18  |   test.beforeEach(async ({ page }) => {
  19  |     await page.goto(APP_URL);
  20  |     await loginAsDemo(page);
  21  |   });
  22  | 
  23  |   test('redirects to login if not authenticated', async ({ page }) => {
  24  |     // Logout first
  25  |     await page.evaluate(() => logout());
  26  |     await page.waitForTimeout(300);
  27  |     // Try to navigate to booking
  28  |     await page.evaluate(() => navigate('booking', 1));
  29  |     await page.waitForTimeout(500);
  30  |     // Should land on login page
  31  |     await expect(page.locator('#loginForm')).toBeVisible();
  32  |   });
  33  | 
  34  |   test('renders booking page with 3-step progress indicator', async ({ page }) => {
  35  |     await page.evaluate(() => navigate('booking', 1));
  36  |     await page.waitForSelector('.booking-steps');
  37  |     await expect(page.locator('#step1')).toBeVisible();
  38  |     await expect(page.locator('#step2')).toBeVisible();
  39  |     await expect(page.locator('#step3')).toBeVisible();
  40  |   });
  41  | 
  42  |   test('step 1 — shows calendar and Next button is disabled initially', async ({ page }) => {
  43  |     await page.evaluate(() => navigate('booking', 1));
  44  |     await page.waitForSelector('#calendarWrap');
  45  |     const nextBtn = page.locator('#nextToStep2');
  46  |     await expect(nextBtn).toBeVisible();
  47  |     await expect(nextBtn).toBeDisabled();
  48  |   });
  49  | 
  50  |   test('step 1 — Next button enables after selecting an available date', async ({ page }) => {
  51  |     await page.evaluate(() => navigate('booking', 1));
  52  |     await page.waitForSelector('.calendar-day:not(.disabled):not(.other-month)');
  53  |     // Click the first available (non-disabled, non-past) day
  54  |     const availableDay = page.locator('.calendar-day.available').first();
  55  |     await availableDay.click();
  56  |     await expect(page.locator('#nextToStep2')).toBeEnabled();
  57  |   });
  58  | 
  59  |   test('step 2 — shows time slots after selecting a date', async ({ page }) => {
  60  |     await page.evaluate(() => navigate('booking', 1));
  61  |     await page.waitForSelector('.calendar-day.available');
  62  |     await page.locator('.calendar-day.available').first().click();
  63  |     await page.click('#nextToStep2');
  64  |     await page.waitForSelector('#timeSlotsGrid');
  65  |     await expect(page.locator('#timeSlotsGrid')).toBeVisible();
  66  |     // Should have at least one time slot
  67  |     const slots = page.locator('.time-slot');
  68  |     await expect(slots.first()).toBeVisible();
  69  |   });
  70  | 
  71  |   test('step 2 — Next button disabled until a time slot is selected', async ({ page }) => {
  72  |     await page.evaluate(() => navigate('booking', 1));
  73  |     await page.waitForSelector('.calendar-day.available');
  74  |     await page.locator('.calendar-day.available').first().click();
  75  |     await page.click('#nextToStep2');
  76  |     await page.waitForSelector('#nextToStep3');
  77  |     await expect(page.locator('#nextToStep3')).toBeDisabled();
  78  |   });
  79  | 
  80  |   test('step 2 — selecting a time slot enables Next button', async ({ page }) => {
  81  |     await page.evaluate(() => navigate('booking', 1));
  82  |     await page.waitForSelector('.calendar-day.available');
  83  |     await page.locator('.calendar-day.available').first().click();
  84  |     await page.click('#nextToStep2');
  85  |     await page.waitForSelector('.time-slot:not(.booked)');
  86  |     await page.locator('.time-slot:not(.booked)').first().click();
  87  |     await expect(page.locator('#nextToStep3')).toBeEnabled();
  88  |   });
  89  | 
  90  |   test('step 3 — shows confirmation summary with doctor and date/time', async ({ page }) => {
  91  |     await page.evaluate(() => navigate('booking', 1));
  92  |     await page.waitForSelector('.calendar-day.available');
  93  |     await page.locator('.calendar-day.available').first().click();
  94  |     await page.click('#nextToStep2');
  95  |     await page.waitForSelector('.time-slot:not(.booked)');
  96  |     await page.locator('.time-slot:not(.booked)').first().click();
  97  |     await page.click('#nextToStep3');
  98  |     await page.waitForSelector('.booking-confirm-card, .confirm-summary, #confirmStep, #bookingContent');
  99  |     // Confirm button should be visible
> 100 |     await expect(page.locator('button:has-text("Confirm Appointment"), #confirmBookingBtn')).toBeVisible();
      |                                                                                              ^ Error: expect(locator).toBeVisible() failed
  101 |   });
  102 | 
  103 |   test('full booking flow — confirms appointment and shows success', async ({ page }) => {
  104 |     await page.evaluate(() => navigate('booking', 1));
  105 |     await page.waitForSelector('.calendar-day.available');
  106 |     await page.locator('.calendar-day.available').first().click();
  107 |     await page.click('#nextToStep2');
  108 |     await page.waitForSelector('.time-slot:not(.booked)');
  109 |     await page.locator('.time-slot:not(.booked)').first().click();
  110 |     await page.click('#nextToStep3');
  111 |     await page.waitForSelector('button:has-text("Confirm Appointment"), #confirmBookingBtn');
  112 |     await page.locator('button:has-text("Confirm Appointment"), #confirmBookingBtn').click();
  113 |     // Should show success state or navigate to dashboard
  114 |     await expect(
  115 |       page.locator('.booking-success, .success-icon, #navDashboardItem:not(.hidden)')
  116 |     ).toBeVisible({ timeout: 10000 });
  117 |   });
  118 | 
  119 |   test('step 2 — Back button returns to step 1', async ({ page }) => {
  120 |     await page.evaluate(() => navigate('booking', 1));
  121 |     await page.waitForSelector('.calendar-day.available');
  122 |     await page.locator('.calendar-day.available').first().click();
  123 |     await page.click('#nextToStep2');
  124 |     await page.waitForSelector('#timeSlotsGrid');
  125 |     await page.click('button:has-text("Back")');
  126 |     await page.waitForSelector('#calendarWrap');
  127 |     await expect(page.locator('#step1')).toHaveClass(/active/);
  128 |   });
  129 | });
  130 | 
```