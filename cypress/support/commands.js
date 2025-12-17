// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('auth', () => {
  cy.request({
    method: 'POST',
    url: `https://fakestoreapi.com/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "username": "johnd",
      "password": "m38rmF$"
    },
    failOnStatusCode: false
  }).then(response => {
    // JSON Path      
    expect(response.status).to.eq(201)
    expect(response.body.token).to.not.be.empty
    expect(response.body.token).to.be.an('string')

    // const token = cy.wrap(response.body.token)
    cy.wrap(response.body.token).as('token') // alias
    Cypress.env('tokenPgats', response.body.token)
  })
})