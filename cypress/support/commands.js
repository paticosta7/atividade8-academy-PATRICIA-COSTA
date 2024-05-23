import { faker } from "@faker-js/faker";

const password = "senha123";

Cypress.Commands.add("cadastrarUsuarioComum", (name, email) => {
  const user = {
    name: name ?? faker.person.fullName(),
    email: email ?? faker.internet.email(),
    password: password,
  };
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiBaseUrl")}/users`,
    body: user,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(201);
    const userResponse = response.body;
    expect(userResponse.id).to.exist;
    return userResponse;
  });
});

Cypress.Commands.add("autenticarUsuárioComum", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiBaseUrl")}/auth/login`,
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    const accessToken = response.body.accessToken;
    expect(accessToken).to.exist;

    Cypress.env("accessToken", accessToken);
    return response.body;
  });
});

Cypress.Commands.add("mockAdmin", () => {
  cy.cadastrarUsuarioComum(user).then(() => {
    cy.autenticarUsuárioComum(user.name, password).then(() => {
      cy.tornarAdmin();
      return user;
    });
  });
});

Cypress.Commands.add("mockCritico", () => {
  cy.cadastrarUsuarioComum(user).then(() => {
    cy.autenticarUsuárioComum(user.name, password).then(() => {
      cy.tornarCritico();
      return user;
    });
  });
});

Cypress.Commands.add("tornarAdmin", () => {
  cy.request({
    method: "PATCH",
    url: `${Cypress.env("apiBaseUrl")}/users/admin`,
    headers: {
      Authorization: `Bearer ${Cypress.env("accessToken")}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("tornarCritico", () => {
  cy.request({
    method: "PATCH",
    url: `${Cypress.env("apiBaseUrl")}/users/apply`,
    headers: {
      Authorization: `Bearer ${Cypress.env("accessToken")}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deletarUsuario", (id) => {
  cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiBaseUrl")}/users/${id}`,
    headers: {
      Authorization: `Bearer ${Cypress.env("accessToken")}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 204) {
      Cypress.env("accessToken", null);
    }
  });
});
