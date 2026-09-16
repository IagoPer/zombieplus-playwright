// Criação de uma extensão para que não precisemos ficar declarando as classes em cada spec

const { test: base, expect } = require("@playwright/test");

const { Leads } = require("../actions/Leads.js");
const { Login } = require("../actions/Login.js");
const { Toast } = require("../actions/Components.js");
const { Movies } = require("../actions/Movies.js");

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;

    context["leads"] = new Leads(page);
    context["login"] = new Login(page);
    context["toast"] = new Toast(page);
    context["movies"] = new Movies(page);

    await use(context);
  },
});

module.exports = { test, expect };
