const { expect } = require("@playwright/test");

export class Login {
  constructor(page) {
    this.page = page;
  }

  // Simplificando as ações de login para ser utilizada na spec Movies
  async do(email, password) {
    this.visit()
    this.submit(email, password)
    this.isLoggedIn()

  }

  async visit() {
    await this.page.goto("http://localhost:3000/admin/login");

    const loginForm = this.page.locator(".login-form");
    await expect(loginForm).toBeVisible();
  }

  async submit(email, password) {
    await this.page.getByPlaceholder("E-mail").fill(email);
    await this.page.getByPlaceholder("Senha").fill(password);
    //await this.page.locator('//button[text()="Entrar"]').click()
    await this.page.getByText("Entrar").click();
  }

  async alertHaveText(text) {
    const alert = this.page.locator("span[class$=alert]");
    await expect(alert).toHaveText(text);
  }

  async isLoggedIn() {
    //const logoutLink = this.page.locator('a[href="/logout"]')
    //await expect(logoutLink).toBeVisible()
    //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')
    //await this.page.waitForLoadState("networkidle");
    //await expect(this.page).toHaveURL(/.*admin/);
    const loggedUser = this.page.locator('.logged-user')
    await expect(loggedUser).toHaveText('Olá, Admin')
  }
}
