import { test, expect } from '@playwright/test'

test.describe('City of Strangers E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('homepage loads and displays districts', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1:has-text("Welcome to The City")')).toBeVisible()

    // Check for district cards
    const districtCards = page.locator('[class*="card"]')
    expect(await districtCards.count()).toBeGreaterThan(0)
  })

  test('can navigate to a district', async ({ page }) => {
    // Click on first district
    await page.click('button:has-text("Explore the City")')
    await expect(page.locator('h1')).toContainText('Welcome to The City')
  })

  test('signup page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/register')
    await expect(page.locator('text=Enter the City')).toBeVisible()
    await expect(page.locator('input[placeholder*="example.com"]')).toBeVisible()
  })

  test('login page is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login')
    await expect(page.locator('text=Return to the City')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})
