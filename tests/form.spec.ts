import { test, expect } from '@playwright/test'

test('フォーム操作のテスト', async ({ page }) => {
  await page.goto('http://localhost:3000/form')
  await page.getByRole('textbox', { name: /1人目/ }).fill('項羽')
  await page.getByRole('textbox', { name: /2人目/ }).fill('劉邦')
  await page.getByRole('button', { name: /シャッフル/ }).click()
  await expect(page.getByRole('status', { name: /結果/ })).toHaveText(/(項羽→劉邦)|(劉邦→項羽)/)
})

test('フォーム操作のテスト(サーバーモック)', async ({ page }) => {
  await page.route('http://localhost:3000/api/shuffle', async (route) => {
    console.log('call mock api')
    const json = { members: ['張飛', '関羽', '劉備'] }
    route.fulfill({ json })
  })

  await page.goto('http://localhost:3000/form')
  await page.getByRole('textbox', { name: /1人目/ }).fill('劉備')
  await page.getByRole('textbox', { name: /2人目/ }).fill('関羽')
  await page.getByRole('textbox', { name: /3人目/ }).fill('張飛')
  await page.getByRole('button', { name: /シャッフル/ }).click()
  await expect(page.getByRole('status', { name: /結果/ })).toHaveText(/張飛→関羽→劉備/)
})
