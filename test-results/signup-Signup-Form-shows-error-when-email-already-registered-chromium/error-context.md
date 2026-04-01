# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: signup.spec.js >> Signup Form >> shows error when email already registered
- Location: tests\signup.spec.js:92:3

# Error details

```
Error: expect(locator).not.toHaveClass(expected) failed

Locator: locator('#signupEmailErr')
Expected pattern: not /hidden/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "not toHaveClass" with timeout 5000ms
  - waiting for locator('#signupEmailErr')

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
      - generic [ref=e25]:
        - heading "Welcome back, Demo! 👋" [level=1] [ref=e26]
        - paragraph [ref=e27]: Manage your appointments and health records from your personal dashboard.
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e31]: 
          - generic [ref=e32]:
            - generic [ref=e33]: "0"
            - generic [ref=e34]: Upcoming
        - generic [ref=e35]:
          - generic [ref=e37]: 
          - generic [ref=e38]:
            - generic [ref=e39]: "0"
            - generic [ref=e40]: Completed
        - generic [ref=e41]:
          - generic [ref=e43]: 
          - generic [ref=e44]:
            - generic [ref=e45]: "0"
            - generic [ref=e46]: Cancelled
      - generic [ref=e47]:
        - button " Upcoming (0)" [ref=e48] [cursor=pointer]:
          - generic [ref=e49]: 
          - text: Upcoming (0)
        - button " Past (0)" [ref=e50] [cursor=pointer]:
          - generic [ref=e51]: 
          - text: Past (0)
        - button " Cancelled (0)" [ref=e52] [cursor=pointer]:
          - generic [ref=e53]: 
          - text: Cancelled (0)
      - generic [ref=e55]:
        - generic [ref=e57]: 
        - heading "No upcoming appointments" [level=3] [ref=e58]
        - paragraph [ref=e59]: Book an appointment with one of our doctors.
        - button " Find Doctors" [ref=e60] [cursor=pointer]:
          - generic [ref=e61]: 
          - text: Find Doctors
      - generic [ref=e62]:
        - generic [ref=e63]:
          - heading "Need a new appointment?" [level=3] [ref=e64]
          - paragraph [ref=e65]: Browse our directory of 500+ verified doctors and book instantly.
        - button " Find a Doctor" [ref=e66] [cursor=pointer]:
          - generic [ref=e67]: 
          - text: Find a Doctor
  - contentinfo [ref=e68]:
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e74]: +
            - generic [ref=e75]: MediConnect
          - paragraph [ref=e76]: Your health, our priority. Connect with top doctors anytime, anywhere.
          - generic [ref=e77]:
            - link "" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: 
            - link "" [ref=e80] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e81]: 
            - link "" [ref=e82] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e83]: 
            - link "" [ref=e84] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e85]: 
        - generic [ref=e86]:
          - heading "Quick Links" [level=4] [ref=e87]
          - list [ref=e88]:
            - listitem [ref=e89]:
              - link "Home" [ref=e90] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e91]:
              - link "Find Doctors" [ref=e92] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e93]:
              - link "Login" [ref=e94] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e95]:
              - link "Sign Up" [ref=e96] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e97]:
          - heading "Specializations" [level=4] [ref=e98]
          - list [ref=e99]:
            - listitem [ref=e100]:
              - link "Cardiology" [ref=e101] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e102]:
              - link "Dermatology" [ref=e103] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e104]:
              - link "Neurology" [ref=e105] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e106]:
              - link "Orthopedics" [ref=e107] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e108]:
              - link "Pediatrics" [ref=e109] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e110]:
          - heading "Contact" [level=4] [ref=e111]
          - list [ref=e112]:
            - listitem [ref=e113]:
              - generic [ref=e114]: 
              - text: 123 Health Ave, New York
            - listitem [ref=e115]:
              - generic [ref=e116]: 
              - text: +1 (800) MEDI-CON
            - listitem [ref=e117]:
              - generic [ref=e118]: 
              - text: support@mediconnect.com
      - generic [ref=e119]:
        - paragraph [ref=e120]: © 2026 MediConnect. All rights reserved.
        - generic [ref=e121]:
          - link "Privacy Policy" [ref=e122] [cursor=pointer]:
            - /url: "#"
          - link "Terms of Service" [ref=e123] [cursor=pointer]:
            - /url: "#"
          - link "Cookie Policy" [ref=e124] [cursor=pointer]:
            - /url: "#"
```

# Test source

```ts
  2   | const path = require('path');
  3   | 
  4   | const APP_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;
  5   | 
  6   | test.describe('Signup Form', () => {
  7   |   test.beforeEach(async ({ page }) => {
  8   |     await page.goto(APP_URL);
  9   |     await page.evaluate(() => navigate('signup'));
  10  |     await page.waitForSelector('#signupForm');
  11  |   });
  12  | 
  13  |   test('renders signup form with all required fields', async ({ page }) => {
  14  |     await expect(page.locator('#signupFirst')).toBeVisible();
  15  |     await expect(page.locator('#signupLast')).toBeVisible();
  16  |     await expect(page.locator('#signupEmail')).toBeVisible();
  17  |     await expect(page.locator('#signupPhone')).toBeVisible();
  18  |     await expect(page.locator('#signupPassword')).toBeVisible();
  19  |     await expect(page.locator('#signupConfirm')).toBeVisible();
  20  |     await expect(page.locator('#signupTerms')).toBeVisible();
  21  |     await expect(page.locator('#signupBtn')).toBeVisible();
  22  |   });
  23  | 
  24  |   test('shows validation errors on empty submit', async ({ page }) => {
  25  |     await page.click('#signupBtn');
  26  |     await expect(page.locator('#signupFirstErr')).not.toHaveClass(/hidden/);
  27  |     await expect(page.locator('#signupLastErr')).not.toHaveClass(/hidden/);
  28  |     await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
  29  |     await expect(page.locator('#signupPasswordErr')).not.toHaveClass(/hidden/);
  30  |   });
  31  | 
  32  |   test('shows error when passwords do not match', async ({ page }) => {
  33  |     await page.fill('#signupFirst', 'John');
  34  |     await page.fill('#signupLast', 'Doe');
  35  |     await page.fill('#signupEmail', 'john@test.com');
  36  |     await page.fill('#signupPassword', 'password123');
  37  |     await page.fill('#signupConfirm', 'different123');
  38  |     await page.check('#signupTerms');
  39  |     await page.click('#signupBtn');
  40  |     await expect(page.locator('#signupConfirmErr')).not.toHaveClass(/hidden/);
  41  |   });
  42  | 
  43  |   test('shows error for password less than 6 characters', async ({ page }) => {
  44  |     await page.fill('#signupFirst', 'John');
  45  |     await page.fill('#signupLast', 'Doe');
  46  |     await page.fill('#signupEmail', 'john@test.com');
  47  |     await page.fill('#signupPassword', 'abc');
  48  |     await page.fill('#signupConfirm', 'abc');
  49  |     await page.check('#signupTerms');
  50  |     await page.click('#signupBtn');
  51  |     await expect(page.locator('#signupPasswordErr')).not.toHaveClass(/hidden/);
  52  |   });
  53  | 
  54  |   test('shows error when terms not checked', async ({ page }) => {
  55  |     await page.fill('#signupFirst', 'John');
  56  |     await page.fill('#signupLast', 'Doe');
  57  |     await page.fill('#signupEmail', 'john@test.com');
  58  |     await page.fill('#signupPassword', 'password123');
  59  |     await page.fill('#signupConfirm', 'password123');
  60  |     // Do NOT check terms
  61  |     await page.click('#signupBtn');
  62  |     await expect(page.locator('#signupTermsErr')).not.toHaveClass(/hidden/);
  63  |   });
  64  | 
  65  |   test('shows error for invalid email format', async ({ page }) => {
  66  |     await page.fill('#signupFirst', 'John');
  67  |     await page.fill('#signupLast', 'Doe');
  68  |     await page.fill('#signupEmail', 'invalidemail');
  69  |     await page.fill('#signupPassword', 'password123');
  70  |     await page.fill('#signupConfirm', 'password123');
  71  |     await page.check('#signupTerms');
  72  |     await page.click('#signupBtn');
  73  |     await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
  74  |   });
  75  | 
  76  |   test('successfully creates a new account with valid data', async ({ page }) => {
  77  |     const uniqueEmail = `test_${Date.now()}@example.com`;
  78  |     await page.fill('#signupFirst', 'Jane');
  79  |     await page.fill('#signupLast', 'Smith');
  80  |     await page.fill('#signupEmail', uniqueEmail);
  81  |     await page.fill('#signupPhone', '+1 (555) 123-4567');
  82  |     await page.fill('#signupPassword', 'securepass1');
  83  |     await page.fill('#signupConfirm', 'securepass1');
  84  |     await page.check('#signupTerms');
  85  |     await page.click('#signupBtn');
  86  |     // Wait for account creation (simulated delay ~900ms)
  87  |     await page.waitForTimeout(1200);
  88  |     // After signup, user should be logged in — dashboard nav visible
  89  |     await expect(page.locator('#navDashboardItem')).not.toHaveClass(/hidden/);
  90  |   });
  91  | 
  92  |   test('shows error when email already registered', async ({ page }) => {
  93  |     // demo@mediconnect.com is a pre-existing account
  94  |     await page.fill('#signupFirst', 'Demo');
  95  |     await page.fill('#signupLast', 'User');
  96  |     await page.fill('#signupEmail', 'demo@mediconnect.com');
  97  |     await page.fill('#signupPassword', 'demo123');
  98  |     await page.fill('#signupConfirm', 'demo123');
  99  |     await page.check('#signupTerms');
  100 |     await page.click('#signupBtn');
  101 |     await page.waitForTimeout(1200);
> 102 |     await expect(page.locator('#signupEmailErr')).not.toHaveClass(/hidden/);
      |                                                       ^ Error: expect(locator).not.toHaveClass(expected) failed
  103 |   });
  104 | 
  105 |   test('role selector defaults to patient', async ({ page }) => {
  106 |     const checkedRole = await page.$eval(
  107 |       'input[name="role"]:checked',
  108 |       el => el.value
  109 |     );
  110 |     expect(checkedRole).toBe('patient');
  111 |   });
  112 | });
  113 | 
```