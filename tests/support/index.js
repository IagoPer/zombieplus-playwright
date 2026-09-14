// Criação de uma extensão para que não precisemos ficar declarando as classes em cada spec

const { test: base, expect } = require("@playwright/test");

const { LandingPages } = require("../pages/LandingPages.js");
const { LoginPage } = require("../pages/LoginPage.js");
const { Toast } = require("../pages/Components.js");
const { MoviesPage } = require("../pages/MoviesPage.js");

const test = base.extend({
  page: async ({ page }, use) => {
    page.landing = new LandingPages(page);
    page.login = new LoginPage(page);
    page.toast = new Toast(page);
    page.movies = new MoviesPage(page);

    await use(page);
  },
});

module.exports = { test, expect };
