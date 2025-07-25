import { expect, type Locator, type Page } from '@playwright/test';

export class UtilityPage {
    page: Page;
    Searchbutton: Locator;
    SearchHelp: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.Searchbutton = page.locator('.DocSearch.DocSearch-Button')
        this.SearchHelp = page.locator('.DocSearch-Help')
    }
}
