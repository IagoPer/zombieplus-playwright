const { expect } = require("@playwright/test");

export class Toast {
  
    constructor(page){
        this.page = page
    }
  
  
    async containText(message) {
    const toast = this.page.locator(".toast");

    await expect(toast).toContainText(message);
    //await expect(toast).toBeHidden({ timeout: 5000 }) //**Garante que o elemento não faça parte do HTML */
    await expect(toast).not.toBeVisible({ timeout: 15000 }); //**Elemento pode estar no HTML, mas não exibido em tela */
  }
}
