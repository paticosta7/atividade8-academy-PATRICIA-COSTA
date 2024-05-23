import {
  After,
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/login.page";
import ManagerPage from "../pages/manager.page";

const managerPage = new ManagerPage();
const loginPage = new LoginPage();
let user;

const mockUp = () => {
  cy.cadastrarUsuarioComum().then((userData) => {
    user = userData;

    loginPage.visitar();
    loginPage.preencherEmail(user.email);
    loginPage.preencherSenha("senha123");
    loginPage.submeterFormulario();
  });
};

const cleanUp = (senha) => {
  managerPage.visitarPerfil();
  managerPage.clicarBotaoSair();

  cy.autenticarUsuárioComum(user?.email, senha).then(() => {
    cy.tornarAdmin().then(() => {
      cy.deletarUsuario(user?.id);
    });
  });

  cy.clearCookies();
  cy.clearLocalStorage();
};

After({ tags: "@senhaAlterada" }, () => {
  cleanUp("novaSenha123");
});

After({ tags: "@manager" }, () => {
  cleanUp("senha123");
});

Before({ tags: "@senhaAlterada" }, () => {
  mockUp();
});

Before({ tags: "@manager" }, () => {
  mockUp();
});

Before({ tags: "@usuarioLogado" }, () => {
  managerPage.verificarUsuarioLogado();
});

Given("eu acesso a página inicial da aplicação", () => {
  managerPage.visitarPaginaInicial();
});

When("não vejo acesso para página de perfil", () => {
  managerPage.verificarUsuarioNaoLogado();
});

When("eu acesso a rota de perfil", () => {
  managerPage.visitarPerfil();
});

When("eu acesso a rota de gerenciamento de perfil", () => {
  managerPage.visitarGerenciamento();
});

Then("eu devo ser redirecionado para página de login", () => {
  managerPage.verificaRedirecionamentoParaLogin();
});

When("eu devo ver o menu de perfil", () => {
  managerPage.verificarUsuarioLogado();
});

When("eu clico no botão de perfil", () => {
  managerPage.clicarBotaoPerfil();
});

When("eu devo ver minhas informações", () => {
  managerPage.checarInformacoes(user.name, user.email);
});

When("eu devo clicar no botão de editar", () => {
  managerPage.clicarBotaoEditar();
});

Then("deve ser redirecionada para página de edição", () => {
  managerPage.verificaRedirecionamentoParaGerenciamento();
});

When("eu acesso a página de edição de perfil", () => {
  managerPage.visitarGerenciamento();
});

Then("o campo de e-mail deve estar desabilitado", () => {
  managerPage.verificarCampoEmail();
});

Then("o campo de senha deve estar desabilitado", () => {
  managerPage.verificarCampoSenhaEstaInativo();
});

Then("o campo de confirmação de senha deve estar desabilitado", () => {
  managerPage.verificarCampoConfirmarSenhaEstaInativo();
});

Then("os campos devem estar habilitados", () => {
  managerPage.verificarCampoConfirmarSenhaEstaAtivo();
  managerPage.verificarCampoSenhaEstaAtivo();
});

When("eu altero meu nome para {string}", (nome) => {
  managerPage.preencherNome(nome);
});

When("eu altero minha senha para {string}", (senha) => {
  managerPage.preencherSenha(senha);
});

When("eu confirmo a nova senha como {string}", (senha) => {
  managerPage.preencherConfirmarSenha(senha);
});

When("eu submeto o formulário de edição", () => {
  managerPage.submeterFormulario();
});

When("eu clico em botão de alterar senha", () => {
  managerPage.clicarBotaoDeAlterarSenha();
});

Then("eu devo ver uma mensagem de sucesso informando {string}", (mensagem) => {
  managerPage.verificarMensagem(mensagem);
  managerPage.clicarBotaoNotificacao();
});

Then("eu devo ver uma mensagem de erro informando {string}", (mensagem) => {
  managerPage.verificarMensagem(mensagem);
  managerPage.clicarBotaoNotificacao();
});

Then(
  "eu devo ver uma mensagem de erro na alteração de senha {string}",
  (mensagem) => {
    managerPage.verificarMensagemErro(mensagem);
  },
);
