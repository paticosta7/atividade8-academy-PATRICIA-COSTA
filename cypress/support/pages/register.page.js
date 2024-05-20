export class RegisterPage {
  visitar() {
    cy.visit("/register");
  }

  preencherNome(nome) {
    cy.get('input.profile-input[placeholder="Nome"][name="name"]')
      .clear()
      .type(nome);
  }

  preencherEmail(email) {
    cy.get(":nth-child(2) > .profile-input").clear().type(email);
  }

  preencherSenha(senha) {
    cy.get(
      'input.profile-input[type="password"][placeholder="Senha"][name="password"]'
    )
      .clear()
      .type(senha);
  }

  preencherConfirmarSenha(confirmarSenha) {
    cy.get(
      'input.profile-input[type="password"][placeholder="Confirmar senha"][name="confirmPassword"]'
    )
      .clear()
      .type(confirmarSenha);
  }

  submeterFormulario() {
    cy.get('button.account-save-button[type="submit"]').click();
  }
  verificarMensagemSucesso() {
    cy.get(".modal-content .modal-body .error-message").should(
      "contain",
      "Cadastro realizado!"
    );
    cy.get(".modal-actions button").click();
  }

  limparUsuario() {
    return cy.buscarUsuario("batmanbegins@teste.com").then((usuario) => {
      if (usuario?.id) {
        cy.deletarUsuario(usuario.id);
      }
    });
  }
}

export default RegisterPage;
