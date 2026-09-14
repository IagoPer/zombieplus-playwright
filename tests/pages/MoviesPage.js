const { expect } = require("@playwright/test");

const { Toast } = require("../pages/Components");



export class MoviesPage {
  constructor(page) {
    this.page = page;
  }

  async isLoggedIn() {
    //const logoutLink = this.page.locator('a[href="/logout"]')
    //await expect(logoutLink).toBeVisible()
    //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*admin/);
  }

  async create(title, overview, company_id, release_year) {
    await this.page.locator('a[href$="register"]').click();
    await this.page.locator("#title").fill(title);
    await this.page.getByLabel("Sinopse").fill(overview);

    await this.page
      .locator("#select_company_id .react-select__dropdown-indicator")
      .click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: company_id })
      .click();

    await this.page
      .locator("#select_year .react-select__dropdown-indicator")
      .click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: release_year })
      .click();

    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }
}
