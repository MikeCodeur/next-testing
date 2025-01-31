import {CreateProduct} from '@/services/types/domain/product-types'

describe('Server Component', () => {
  it('Sign-in: without session', () => {
    cy.visitSignIn()
  })

  it('Admin shop contains 20 products', () => {
    cy.visitShopAdmin()
    cy.get('tbody').find('tr').should('have.length', 20)
  })
})

// Just for compilation
export const justForCompil = ''
