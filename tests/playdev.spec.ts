import { UtilityPage } from './page/utility-page';
import { test, expect } from '@playwright/test';

var utilityPage

test.beforeEach(async ({ page }) => {
  utilityPage = await new UtilityPage(page);
});

test('Should have search button on landing page', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(utilityPage.Searchbutton).toHaveAttribute('type', 'button');

});

test('No recent searches in the doc help search', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await utilityPage.Searchbutton.click();

  await expect(utilityPage.SearchHelp).toHaveText("No recent searches");
});

test('Recent searches show up properly', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await utilityPage.Searchbutton.click();

  await page.locator('.DocSearch-Input').pressSequentially('Introduction', { delay: 100 });;
  await page.keyboard.press('Enter');

  const introduction = await page.locator('#introduction')
  await expect(introduction).toHaveText("Introduction");

  await utilityPage.Searchbutton.click();

  const recentSearches = await page.locator("#docsearch-recentSearches-item-0");
  await expect(recentSearches).toContainText("Introduction");
  await expect(recentSearches).toHaveCount(1);
 }); 


test('Top left playwright button sends you to hompage', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const docsButton = page.getByText('Docs');
  await docsButton.click();


  const playWrightHomeButton = await page.locator('.navbar__brand');
  await playWrightHomeButton.click();

  await expect(page).toHaveURL('https://playwright.dev/');
});

test('Clicking on docs sends you to the page with all the documents', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const docsButton = page.getByText('Docs');
  await docsButton.click();

  const docsList = await page.locator('.theme-doc-sidebar-menu.menu__list');
  await expect(docsList).toContainText[('Getting Started')];
  await expect(docsList).toContainText[('Getting started - VS Code')];
  await expect(docsList).toContainText[('Canary releases')];
  await expect(docsList).toContainText[('Playwright Test')];
  await expect(docsList).toContainText[('Guides')];
  await expect(docsList).toContainText[('Migration')];
  await expect(docsList).toContainText[('Integrations')];
  await expect(docsList).toContainText[('Supported languages')];

});

test('Does the top right Github button bring you to the right url, https://github.com/microsoft/playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const newTabPromise = page.waitForEvent("popup");
  
  await page.getByRole("link", { name: "GitHub repository" }).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();
  
  await expect(newTab).toHaveURL("https://github.com/microsoft/playwright");
  await expect(newTab).toHaveTitle(
    "GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API."
  );
  
});

test('Another similar test for the discord button at the top', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const newTabPromise = page.waitForEvent("popup");

  await page.getByRole("link", {name: "Discord server"}).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL("https://discord.com/servers/playwright-807756831384403968")

  const aboutSection = await newTab.locator(".colorStandard-1nZ0G7.size18-2TfY0C.textMedium-3Ic-hz");
  await expect(aboutSection).toContainText("This server is for the Playwright community to ask questions to other community members and our Playwright ambassadors. We also have channels for articles, videos and conference/meetup talks where you can find more content created by the community. Use this channel to share any content you have created our found.Voice channels can be used to chat with other community members.Events... coming soon");
});