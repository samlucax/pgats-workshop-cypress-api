const user = require('../fixtures/user.json')

export function auth() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      "username": user.username,
      "password": user.password
    },
    failOnStatusCode: false
  }).then(response => {
    // JSON Path      
    expect(response.status).to.eq(201)
    expect(response.body.token).to.not.be.empty
    expect(response.body.token).to.be.an('string')

    cy.wrap(response.body.token).as('token') // alias
    Cypress.env('tokenPgats', response.body.token)
  })
}

export function getCartByIdWithAlias(id) {
  cy.get('@token').then(token => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/carts/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      failOnStatusCode: false
    })
  })
}

export function getCartByIdWithEnv(id) {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/carts/${id}`,
    headers: {
      'Authorization': `Bearer ${Cypress.env('tokenPgats')}`
    },
    failOnStatusCode: false
  })
}