/// <reference types="cypress" />

import { auth, getCartByIdWithAlias, getCartByIdWithEnv } from '../support/requests'
const carts = require('../fixtures/carts.json')

describe('template spec', () => {
  beforeEach(() => {
    auth()
  });

  it('passes', () => {
    getCartByIdWithAlias(1)
    getCartByIdWithEnv(1)
  })

  // DDT - Data Driven Testing / Testes Orientados a Dados
  Array.from(carts).forEach(cart => {
    it(`cart with id ${cart.id} should have the userId ${cart.userId}`, () => {
      getCartByIdWithEnv(cart.id).then(response => {
        expect(response.body.userId).to.eq(cart.userId)
      })
    });
  })
})

