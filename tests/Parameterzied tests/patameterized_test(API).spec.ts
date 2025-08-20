import { platform } from 'os';
import { test, expect } from '@playwright/test';
import { UtilityPage } from '../Page/Utility-page';


var utilityPage


test.beforeEach(async ({ page }) => {
  utilityPage = await new UtilityPage(page);
});


const testParameters = ['Node.js', 'Python', 'Java', '.NET' ];

for (const searchKeyword of testParameters) {
    test(`Checking for API secttion to show up by HeaderTitle ${searchKeyword}`, async ({ page }) => {
  await utilityPage.goToPlaywrightHomepage();

  await utilityPage.APIButton.click();
  await utilityPage.Platformbutton.hover();

  await page.locator('.navbar__item.dropdown.dropdown--hoverable').getByRole('link', {name: searchKeyword}).click();

  const APIreference  = await page.locator('.theme-doc-breadcrumbs.breadcrumbsContainer_Z_bl');
  await expect(APIreference).toContainText("API reference");

});
}
