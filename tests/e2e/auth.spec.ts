import { expect, test } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can register and login', async ({ page }) => {
    // Register
    await page.goto('http://localhost:3000/auth/register')
    const email = `test-${Date.now()}@example.com`

    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', 'Test123!')
    await page.fill('input[placeholder="••••••••"]', 'Test123!')
    await page.click('button:has-text("Create Account")')

    // Should redirect to login
    await expect(page).toHaveURL('**/auth/login')

    // Login
    await page.fill('input[placeholder="you@example.com"]', email)
    await page.fill('input[placeholder="••••••••"]', 'Test123!')
    await page.click('button:has-text("Sign In")')

    // Should be redirected to home
    await expect(page).toHaveURL('/')
  })
})
