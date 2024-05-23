export class ManagerPage {
  caminhoPaginaInicial = "/";
  caminhoPerfil = "/profile";
  caminhoGerenciamento = "/account";

  navMenuItemRegistro = 'a.movies-page-link[href="/register"]';
  navMenuItemLogin = 'a.movies-page-link[href="/login"]';
  navMenuItemPerfil = 'a.movies-page-link[href="/profile"]';

  infoDoUsuario = ".user-info";
  botaoDeEdicao = 'a.account-link[href="/account"]';
  botaoDeSair = 'a.account-link[href="/logout"]';

  nome = "input[name='name']";
  email = "input[name='email']";
  senha = 'input[name="password"]';
  confirmacaoSenha = 'input[name="confirmPassword"]';
  botaoDeAlterarSenha = "button.account-password-button";
  botaoDeSubmeter = "button.account-save-button";
  campoErro = ".input-error";

  notificacao = ".modal-body";
  botaoNotificacao = ".modal-actions button";
  mensagemNotificacao = ".error-message";
  mensagemCampoObrigatorio = ".field-required-message";

  visitarPaginaInicial() {
    cy.visit(this.caminhoPaginaInicial);
  }

  visitarPerfil() {
    cy.visit(this.caminhoPerfil);
  }

  visitarGerenciamento() {
    cy.visit(this.caminhoGerenciamento);
  }

  verificaRedirecionamentoParaLogin() {
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  }

  verificaRedirecionamentoParaGerenciamento() {
    cy.url().should("eq", `${Cypress.config().baseUrl}/account`);
  }

  verificarUsuarioNaoLogado() {
    cy.get(this.navMenuItemRegistro).should("exist");
    cy.get(this.navMenuItemLogin).should("exist");
    cy.get(this.navMenuItemPerfil).should("not.exist");
  }

  verificarUsuarioLogado() {
    cy.get(this.navMenuItemRegistro).should("not.exist");
    cy.get(this.navMenuItemLogin).should("not.exist");
    cy.get(this.navMenuItemPerfil).should("exist");
  }

  clicarBotaoPerfil() {
    cy.get(this.navMenuItemPerfil).click();
  }

  clicarBotaoDeAlterarSenha() {
    cy.get(this.botaoDeAlterarSenha).click();
  }

  checarInformacoes(nome, email) {
    cy.get(this.infoDoUsuario).should("contain.text", nome);
    cy.get(this.infoDoUsuario).should("contain.text", email);
  }

  clicarBotaoEditar() {
    cy.get(this.botaoDeEdicao).click();
  }

  clicarBotaoSair() {
    cy.get(this.botaoDeSair).click();
  }

  preencherNome(nome) {
    if (nome !== "") {
      cy.get(this.nome).clear().type(nome);
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

  verificarCampoEmail() {
    cy.get(this.email).should("be.disabled");
  }

  verificarCampoSenhaEstaAtivo() {
    cy.get(this.senha).should("be.enabled");
  }

  verificarCampoSenhaEstaInativo() {
    cy.get(this.senha).should("be.disabled");
  }

  verificarCampoConfirmarSenhaEstaAtivo() {
    cy.get(this.confirmacaoSenha).should("be.enabled");
  }

  verificarCampoConfirmarSenhaEstaInativo() {
    cy.get(this.confirmacaoSenha).should("be.disabled");
  }

  clicarBotaoNotificacao() {
    cy.get(this.botaoNotificacao).click();
  }

  verificarMensagem(mensagem) {
    cy.get(this.notificacao).should("be.visible");
    cy.get(this.notificacao).and("contain", mensagem);
  }

  verificarMensagemErro(mensagem) {
    cy.get(this.campoErro).should("be.visible");
    cy.get(this.campoErro).and("contain", mensagem);
  }
}

export default ManagerPage;
