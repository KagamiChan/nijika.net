import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/虹夏工房/)

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('header').getByText('虹夏工房')).toBeVisible()

  await expect(page.locator('footer')).toBeVisible()
  await expect(page.locator('footer').getByText('虹夏工房')).toBeVisible()
})

test('about page', async ({ page }) => {
  await page.goto('/about')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/虹夏工房/)
  await expect(page).toHaveTitle(/关于/)

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('header').getByText('虹夏工房')).toBeVisible()

  await expect(page.locator('footer')).toBeVisible()
  await expect(page.locator('footer').getByText('虹夏工房')).toBeVisible()
})
