import { platform } from 'os';
import { UtilityPage } from './Page/UtilityPage';
import { test, expect } from '@playwright/test';

var utilityPage

test.beforeEach(async ({ page }) => {
  utilityPage = await new UtilityPage(page);
});

test('Should have search button on landing page', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await expect(utilityPage.Searchbutton).toHaveAttribute('type', 'button');
});

test('No recent searches in the doc help search', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();
  await utilityPage.Searchbutton.click();

  await expect(utilityPage.SearchHelp).toHaveText("No recent searches");
});

test('Recent searches show up properly', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();
  await utilityPage.Searchbutton.click();

  await page.locator('.DocSearch-Input').pressSequentially('Introduction', { delay: 100 });
  await page.keyboard.press('Enter');

  const introduction = await page.locator('#introduction')
  await expect(introduction).toHaveText("Introduction");

  await utilityPage.Searchbutton.click();

  const recentSearches = await page.locator("#docsearch-recentSearches-item-0");
  await expect(recentSearches).toContainText("Introduction");
  await expect(recentSearches).toHaveCount(1);
 }); 


test('Top left playwright button sends you to hompage', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();
  await utilityPage.Docsbutton.click();

  const playWrightHomeButton = await page.locator('.navbar__brand');
  await playWrightHomeButton.click();
 
  await expect(page).toHaveURL('https://playwright.dev/');
});

test('Clicking on docs sends you to the page with all the documents', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

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
  await utilityPage.goToPlaywrightHomepage();
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
  await utilityPage.goToPlaywrightHomepage();
  const newTabPromise = page.waitForEvent("popup");

  await page.getByRole("link", {name: "Discord server"}).click();
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL("https://discord.com/servers/playwright-807756831384403968")

  const aboutSection = await newTab.locator(".colorStandard-1nZ0G7.size18-2TfY0C.textMedium-3Ic-hz");
  await expect(aboutSection).toContainText("This server is for the Playwright community to ask questions to other community members and our Playwright ambassadors. We also have channels for articles, videos and conference/meetup talks where you can find more content created by the community. Use this channel to share any content you have created our found.Voice channels can be used to chat with other community members.Events... coming soon");
});

test('Does the correct installation doc instructions show when selecting Node.js', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  await utilityPage.Platformbutton.hover();
  
  await page.getByRole('link', { name: 'Node.js' }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');

});

test('Similar test, does the correct installation doc instructions show when selecting Python', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  await utilityPage.Platformbutton.hover();

  await page.getByRole('link', { name: 'Python'}).click();
  await expect(page).toHaveURL('https://playwright.dev/python/docs/intro');

});

test('Similar test, does the correct doc instructions show for Java', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  await utilityPage.Docsbutton.click();

  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', { name: 'Java' }).click();
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');

});

test('Similar test, does the correct doc instructions show for .NET', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  await utilityPage.Docsbutton.click();

  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: '.NET'}).click();
  await expect(page).toHaveURL('https://playwright.dev/dotnet/docs/intro')

});

test('Similar test, does the correct API instructions show for Node.js', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.APIButton.click();
  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: 'Node.js'}).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/api/class-playwright');

});

test('Similar text, does the correct API instructions show for Python', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.APIButton.click();
  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: 'Python'}).click();
  await expect(page).toHaveURL('https://playwright.dev/python/docs/api/class-playwright');

});

test('Similar test, does the correct API instructions show for Java', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.APIButton.click();
  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: 'Java'}).click();
  await expect(page).toHaveURL('https://playwright.dev/java/docs/api/class-playwright');

});

test('Similar text, does the correct API instructions show for .NET', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();
  
  await utilityPage.APIButton.click();

  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: '.NET'}).click();
  await page.waitForTimeout(250);
  await expect(page).toHaveURL('https://playwright.dev/dotnet/docs/api/class-playwright');
  

});


test('When using the docs page, does the list on the right and left function correctly? Clicking on the elements works correctly?', async ({ page }) => {
//Testing the link 'running and debugging' for the list on the left side 
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  await page.locator('.theme-doc-sidebar-item-category.theme-doc-sidebar-item-category-level-1.menu__list-item').getByRole('link', {name: 'Running and debugging tests'}).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/running-tests');

});

test('Similar test, does the list on the right and left function correctly? Clicking on the elements works correctly?', async ({ page }) => {
//Testing the link 'running and debugging' for the list on the left side, for docs button
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  await page.locator('.theme-doc-sidebar-item-category.theme-doc-sidebar-item-category-level-1.menu__list-item').getByRole('link', {name: 'Running and debugging tests'}).click();

  await page.locator('.table-of-contents.table-of-contents__left-border').getByRole('link', {name: 'Command line'}).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/running-tests#command-line');

});

test('Similar test, does the list on the left function correctly with the API button selected', async ({ page }) => {
// Testing the link on the right 'ELectronApplication' API button
  await utilityPage.goToPlaywrightHomepage();

  const apiButton = await utilityPage.APIButton.click();
  await page.locator('.theme-doc-sidebar-item-category.theme-doc-sidebar-item-category-level-2.menu__list-item').getByRole('link', {name: 'ElectronApplication'}).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/api/class-electronapplication');
  
});

test('At the bottom of reading an article does it shouldnt have the previous article button if your on the very first one', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  const hiddenElement = page.locator('.pagination-nav__link.pagination-nav__link--prev');
  await expect(hiddenElement).not.toBeVisible();

});

test('Similar test, does the next button at the bottom work properly?', async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();
  await page.locator('.docusaurus-mt-lg.pagination-nav').getByRole('link', {name: 'Next'}).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/writing-tests');


});
