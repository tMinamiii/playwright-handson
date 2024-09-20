import { test, expect } from '@playwright/test';
import getRepoInfo from 'git-repo-info';
import { Jimp, loadFont, HorizontalAlign, VerticalAlign } from 'jimp';
import { SANS_32_BLACK } from 'jimp/fonts';
import dayjs from 'dayjs';

test('スクリーンショット', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.screenshot({ path: 'screenshot.png' });
});

test('スクリーンショット全体', async ({ page }) => {
  await page.goto('http:/playwright.dev');
  await page.screenshot({ path: 'screenshot_full.png', fullPage: true });
});

test('スクリーンショットタイムスタンプ', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/form');
  const buffer = await page.screenshot();

  const image = await Jimp.read(buffer);
  const font = await loadFont(SANS_32_BLACK);
  const git = getRepoInfo();

  image.print({
    font,
    x: 0,
    y: 0,
    text: {
      alignmentX: HorizontalAlign.RIGHT,
      alignmentY: VerticalAlign.BOTTOM,
      text: `${git.sha.slice(0, 10)}:${dayjs().format('YYYY/MM/DD HH:mm:ss')}`
    },
    maxWidth: image.width,
    maxHeight: image.height
  });

  await image.write(`${testInfo.outputDir}screeshot01.png`);
});
