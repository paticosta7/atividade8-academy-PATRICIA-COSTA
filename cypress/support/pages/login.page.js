export class LoginPage {
  caminho = "/login";
  email = "input[name='email']";
  senha = 'input[name="password"]';
  botaoDeSubmeter = 'button.login-button[type="submit"]';
  notificacao = ".modal-body";
  botaoNotificacao = ".modal-actions button";
  mensagemNotificacao = ".error-message";
  mensagemCampoObrigatorio = ".field-required-message";

  visitar() {
    cy.visit(this.caminho);
  }

  preencherEmail(email) {
    if (email !== "") {
      cy.get(this.email).clear().type(email);
    }
  }

  preencherSenha(senha) {
    if (senha !== "") {
      cy.get(this.senha).clear().type(senha);
    }
  }

  submeterFormulario() {
    cy.get(this.botaoDeSubmeter).click();
  }

  verificaRedirecionamento() {
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  }
  
  verificarCamposVazios(erro) {
    cy.get(".input-error").should("contain", erro);
  }

  verificarMensagem(mensagem) {
    cy.get(this.notificacao).should("be.visible");
    cy.get(this.mensagemNotificacao).and("contain", mensagem);
  }
}

export default LoginPage;
