import { platform } from 'os';
import { test, expect } from '@playwright/test';
import { UtilityPage } from '../Page/UtilityPage';


var utilityPage


test.beforeEach(async ({ page }) => {
  utilityPage = await new UtilityPage(page);
});


const testParameters = ['Node.js', 'Python', 'Java', '.NET' ];

for (const searchKeyword of testParameters) {
    test(`Checking that correct install docs show up by HeaderTitle ${searchKeyword}`, async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.Docsbutton.click();

  await utilityPage.Platformbutton.hover();
  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', { name: searchKeyword }).click();
  await page.waitForTimeout(500);

  const headerTitle  = await page.locator('.col.docItemCol_VOVn');
  await expect(headerTitle).toContainText("Installation");

  });
}


  