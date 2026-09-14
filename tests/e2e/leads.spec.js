const { test, expect } = require('../support/index.js');

const { faker } = require("@faker-js/faker");

///** @type {LandingPages} */ // avisa ao editor de código: "Olha, essa variável landingPages vai guardar um objeto do tipo da classe LandingPages". Por isso, ela está vazia
/* let landingPages; */ //Variável para não precisar instanciar a classe LandingPages em todos os testes
/* let toast; */

// beforeEach roda para cada teste
/* test.beforeEach(async ({ page }) => {
  landingPages = new LandingPages(page);
  toast = new Toast(page);
}); */ //Gancho para ser executado uma vez para cada teste

// beforeAll roda uma única vez e seja reaproveitada para ambos os testes
/* test.beforeAll(async () => {
  leadName = faker.person.fullName()
  leadEmail = faker.internet.email()
}) */

test("deve cadastrar um lead na fila de espera", async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  // visit
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm(leadName, leadEmail);

  // toastHaveText
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message);
});

test("Não deve cadastrar quando email já existe", async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  
// Cadastrando lead através de API por ser mais rápido, garantindo a pré existência da massa para o caso duplicado  
  const newLead = await request.post('http://localhost:3333/leads', {
    data:{
      name: leadName,
      email: leadEmail
    }
  })
//Confirmando que o status code foi Sucesso
  expect(newLead.ok()).toBeTruthy()

  // visit
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm(leadName, leadEmail);

  // toastHaveText
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message);
});

test("E-mail incorreto", async ({ page }) => {
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm("Iago Pereira", "iago.gmail.com");

  await page.landing.alertHaveText("Email incorreto");
});

test("Nome obrigatório", async ({ page }) => {
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm("", "iago@gmail.com");

  await page.landing.alertHaveText("Campo obrigatório");
});

test("Campo nome e email sem preenchimento", async ({ page }) => {
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm("", "");

  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});

test("Email obrigatório", async ({ page }) => {
  await page.landing.visit();

  // open LeadModal
  await page.landing.openLeadModal();

  // submit LeadForm
  await page.landing.submitLeadForm("Iago Pereira", "");

  await page.landing.alertHaveText("Campo obrigatório");
});


