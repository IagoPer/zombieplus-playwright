// Criação de uma extensão para que não precisemos ficar declarando as classes em cada spec

const { test: base, expect } = require("@playwright/test");

const { LandingPages } = require("../pages/LandingPages.js");
const { LoginPage } = require("../pages/LoginPage.js");
const { Toast } = require("../pages/Components.js");
const { MoviesPage } = require("../pages/MoviesPage.js");

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context["landing"] = new LandingPages(page);
    context["login"] = new LoginPage(page);
    context["toast"] = new Toast(page);
    context["movies"] = new MoviesPage(page);

    await use(context);
  },
});

module.exports = { test, expect };
