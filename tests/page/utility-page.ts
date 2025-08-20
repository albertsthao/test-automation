import { expect, type Locator, type Page } from '@playwright/test';

export class UtilityPage {
    readonly PLAYWRIGHT_URL = 'https://playwright.dev';
    readonly page: Page;
    Searchbutton: Locator;
    SearchHelp: Locator;
    Docsbutton: Locator;
    Platformbutton: Locator; 
    APIButton: Locator; 

    constructor(page: Page) {
        this.page = page; 
        this.Searchbutton = page.locator('.DocSearch.DocSearch-Button')
        this.SearchHelp = page.locator('.DocSearch-Help')
        this.Docsbutton = page.getByText('Docs');
        this.Platformbutton = page.locator('.navbar__item.dropdown.dropdown--hoverable');
        this.APIButton = page.locator('.theme-layout-navbar-left.navbar__items').getByRole('link', {name: 'API'});
    }

    async goToPlaywrightHomepage(): Promise<void> {
        await this.page.goto(this.PLAYWRIGHT_URL, { waitUntil: 'domcontentloaded' })
    }
}
