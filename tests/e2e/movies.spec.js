const { test } = require("../support/index.js");

const data = require("../support/fixtures/movies.json");

const { executeSQL } = require("../support/database");

test("deve poder cadastrar um novo filme", async ({ page }) => {
  //Os comandos abaixo estão usando apenas a camanda do PageObject (index.js)
  const movie = data.army_of_the_dead;

  await executeSQL(`delete from movies where title = '${movie.title}';`);

  await page.login.do("admin@zombieplus.com", "pwd123");
  
  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company_id,
    movie.release_year,
  );

  await page.toast.containText("Cadastro realizado com sucesso!");
});

test("não deve cadastrar quando os campos obrigatórios não são preenchidos", async ({ page }) => {
  
  await page.login.do("admin@zombieplus.com", "pwd123");

  await page.movies.goForm();

  await page.movies.submit();

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
});

