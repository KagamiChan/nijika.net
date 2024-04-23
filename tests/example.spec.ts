import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/アトリエにじか/)

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('header').getByText('アトリエにじか')).toBeVisible()

  await expect(page.locator('footer')).toBeVisible()
  await expect(page.locator('footer').getByText('アトリエにじか')).toBeVisible()
})

test('about page', async ({ page }) => {
  await page.goto('/about')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/アトリエにじか/)
  await expect(page).toHaveTitle(/关于/)

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('header').getByText('アトリエにじか')).toBeVisible()

  await expect(page.locator('footer')).toBeVisible()
  await expect(page.locator('footer').getByText('アトリエにじか')).toBeVisible()
})
