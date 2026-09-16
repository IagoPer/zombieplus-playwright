// IMPORTANTE: Importe o expect para poder usá-lo dentro da classe
import { expect } from "@playwright/test";

export class Leads {
  constructor(page) {
    this.page = page; // Salva o page do Playwright no escopo da classe
  }

  async visit() {
    // Erro corrigido: Adicionado o "this." antes de page
    await this.page.goto("http://localhost:3000/");
  }

  async openLeadModal() {
    // Erro corrigido: Adicionado "this." em todos os locais que usam page
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(
      this.page.getByTestId("modal").getByRole("heading"),
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);
    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async alertHaveText(targetMessage) {
    await expect(this.page.locator(".alert")).toHaveText(targetMessage);
  }
}
