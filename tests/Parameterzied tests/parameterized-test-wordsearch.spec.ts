import { platform } from 'os';
import { test, expect } from '@playwright/test';
import { UtilityPage } from '../page/Utility-Page';


var utilityPage


test.beforeEach(async ({ page }) => {
  utilityPage = await new UtilityPage(page);
});

const testParameters = ['API testing', 'Canary Releases', 'Emulation', ];

for (const searchKeyword of testParameters) {
    test(`Searching for 3 topics ${searchKeyword}`, async ({ page }) => {
  await page.goto('https://playwright.dev/');

    // await page.getByRole("link", {name: "Discord server"}).click();
  await page.getByRole('button', {name: "Search"}).click();
  await page.getByPlaceholder('Search').fill(searchKeyword);
  await page.waitForTimeout(250);

  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  

  });
}
