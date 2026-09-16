const { expect } = require("@playwright/test");

const { Toast } = require("./Components");

export class Movies {
  constructor(page) {
    this.page = page;
  }

  // Ação para realizar o clique no botão de formulário para cadastro de filme
  async goForm() {
    await this.page.locator('a[href$="register"]').click();
  }

  // Ação para realizar o clique no botão de cadastro do filme
  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async create(title, overview, company_id, release_year) {
    await this.goForm();
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

    await this.submit();
  }

  async alertHaveText(targetMessage) {
    await expect(this.page.locator(".alert")).toHaveText(targetMessage);
  }
}
