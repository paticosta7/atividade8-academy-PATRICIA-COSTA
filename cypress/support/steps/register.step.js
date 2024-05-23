import {
  After,
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { RegisterPage } from "../pages/register.page";

const registerPage = new RegisterPage();
let user;

After({ tags: "@usuario_cadastrato_sucesso" }, () => {
  cy.autenticarUsuárioComum(user?.email, "senha123").then(() => {
    cy.tornarAdmin().then(() => {
      cy.deletarUsuario(user?.id);
    });
  });
});

Before({ tags: "@usuario_cadastrado" }, () => {
  cy.fixture("register-errors.json").then((errors) => {
    cy.intercept("POST", `${Cypress.env("apiBaseUrl")}/users`, {
      statusCode: 409,
      body: errors["emailEmUso"],
    }).as("usuario_cadastrado_interceptor");
  });
});

Given("que estou na página de registro", () => {
  registerPage.visitar();

  cy.intercept("POST", `${Cypress.env("apiBaseUrl")}/users`).as("registerUser");
});

When("eu preencho os campos corretamente", () => {
  const nome = faker.person.fullName();
  const email = faker.internet.email();
  const senha = "senha123";
  registerPage.preencherNome(nome);
  registerPage.preencherEmail(email);
  registerPage.preencherSenha(senha);
  registerPage.preencherConfirmarSenha(senha);
  registerPage.submeterFormulario();

  cy.wait("@registerUser").then((interception) => {
    user = interception.response.body;
  });
});

When("eu preencho o campo nome com {string}", (nome) => {
  registerPage.preencherNome(nome ?? "");
});

When("eu preencho o campo email com {string}", (email) => {
  registerPage.preencherEmail(email);
});

When("eu preencho o campo senha com {string}", (senha) => {
  registerPage.preencherSenha(senha);
});

When("eu preencho o campo confirmar senha com {string}", (confirmarSenha) => {
  registerPage.preencherConfirmarSenha(confirmarSenha);
});

When("eu submeto o formulário", () => {
  registerPage.submeterFormulario();
});

Then("eu devo ver uma notificação de sucesso {string}", (mensagem) => {
  registerPage.verificarMensagemSucesso(mensagem);
});

Then("eu devo ver uma notificação de erro {string}", (mensagem) => {
  registerPage.verificarMensagemErro(mensagem);
});

Then("eu devo ver uma mensagem de erro na senha {string}", (erro) => {
  registerPage.verificarErroSenha(erro);
});

Then(
  "eu devo ver uma mensagem de erro na confirmação de senha {string}",
  (erro) => {
    registerPage.verificarErroConfirmacaoSenha(erro);
  },
);

Then("eu devo ver a seguinte informação {string}", (erro) => {
  registerPage.verificarCamposVazios(erro);
});
