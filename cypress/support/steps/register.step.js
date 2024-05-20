import {
  After,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { RegisterPage } from "../pages/register.page";

const registerPage = new RegisterPage();

After({ tags: "@registro" }, () => {
  
  cy.autenticarUsuário("cinefilo@qa.com", "senha123").then(() => {
    cy.tornarAdmin().then(() => {
      cy.deletarUsuario(novoUsuario.id);
    });
  });
});

Given("que estou na página de registro", () => {
  registerPage.visitar();
});

When("eu preencho o campo nome com {string}", (nome) => {
  registerPage.preencherNome(nome);
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

Then("eu devo ver uma mensagem de sucesso", () => {
  registerPage.verificarMensagemSucesso();
});
