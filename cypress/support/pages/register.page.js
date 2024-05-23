export class RegisterPage {
  caminho = "/register";
  nome = "input[name='name']";
  email = "input[name='email']";
  senha = 'input[name="password"]';
  confirmacaoSenha = 'input[name="confirmPassword"]';
  nomeErro = `${this.nome} + .input-error`;
  emailErro = `${this.email} + .input-error`;
  senhaErro = `${this.senha} + .input-error`;
  senhaConfirmacaoErro = `${this.confirmacaoSenha} + .input-error`;
  botaoDeSubmeter = "button.account-save-button";
  notificacao = ".modal-body";
  botaoNotificacao = ".modal-actions button";
  mensagemNotificacao = "error-message";

  visitar() {
    cy.visit(this.caminho);
  }

  preencherNome(nome) {
    if (nome !== "") {
      cy.get(this.nome).clear().type(nome);
    }
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

  preencherConfirmarSenha(confirmarSenha) {
    if (confirmarSenha !== "") {
      cy.get(this.confirmacaoSenha).clear().type(confirmarSenha);
    }
  }

  submeterFormulario() {
    cy.get(this.botaoDeSubmeter).click();
  }

  verificarMensagemSucesso(mensagem) {
    cy.get(this.notificacao)
      .should("be.visible")
      .and("contain.text", "Sucesso")
      .should("contain", mensagem);
    cy.get(this.botaoNotificacao).click();
  }

  verificarMensagemErro(mensagem) {
    cy.get(this.notificacao).should("be.visible").should("contain", mensagem);
    cy.get(this.botaoNotificacao).click();
  }

  verificarErroSenha(erro) {
    cy.get(this.senhaErro).should("contain", erro);
  }

  verificarErroConfirmacaoSenha(erro) {
    cy.get(this.senhaConfirmacaoErro).should("contain", erro);
  }

  verificarCamposVazios(erro) {
    cy.get(".input-error").should("contain", erro);
  }
}

export default RegisterPage;
