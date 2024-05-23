import {
  After,
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/login.page";

const loginPage = new LoginPage();
const senha = "senha123";
let user;

After({ tags: "@login" }, () => {
  cy.autenticarUsuárioComum(user?.email, "senha123").then(() => {
    cy.tornarAdmin().then(() => {
      cy.deletarUsuario(user?.id);
    });
  });
});

Before({ tags: "@login" }, () => {
  cy.cadastrarUsuarioComum().then((userData) => {
    user = userData;
  });
});

Given("que estou na página de login", () => {
  loginPage.visitar();

  cy.intercept("POST", `${Cypress.env("apiBaseUrl")}/auth/login`).as(
    "loginUser",
  );
});

When("eu preencho corretamente os campos", () => {
  loginPage.preencherEmail(user.email);
  loginPage.preencherSenha(senha);
  loginPage.submeterFormulario();
});

When("eu preencho o campo email com {string}", (email) => {
  loginPage.preencherEmail(email);
});

When("eu preencho o campo senha com {string}", (senha) => {
  loginPage.preencherSenha(senha);
});

When("eu submeto o formulário", () => {
  loginPage.submeterFormulario();
});

Then("eu devo ser redirecionado para a página inicial logado", () => {
  loginPage.verificaRedirecionamento();
});

Then(
  "eu preencho o campo de email incorretamente {string}",
  (emailDigitado) => {
    loginPage.preencherEmail(emailDigitado);
    loginPage.preencherSenha(senha);
    loginPage.submeterFormulario();
  },
);

Then(
  "eu preencho o campo de senha incorretamente {string}",
  (senhaDigitada) => {
    loginPage.preencherEmail(user.email);
    loginPage.preencherSenha(senhaDigitada);
    loginPage.submeterFormulario();
  },
);

Then("eu devo ver uma notificação informando {string}", (notificação) => {
  loginPage.verificarMensagem(notificação);
});

Then("eu devo ver a seguinte informação {string}", (erro) => {
  loginPage.verificarCamposVazios(erro);
});
