Cypress.Commands.add("autenticarUsuário", (email, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiBaseUrl")}/auth/login`,
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    console.log(response, email, password);
    expect(response.status).to.eq(200);
    const accessToken = response.body.accessToken;
    expect(accessToken).to.exist;

    Cypress.env("accessToken", accessToken);
    return response.body;
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
    expect(response.status).to.eq(204);
    if (response.status === 204) {
      Cypress.env("accessToken", null);
    }
  });
});
