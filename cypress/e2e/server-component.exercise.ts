import {CreateProduct} from '@/services/types/domain/product-types'

describe('Server Component', () => {
  it('Sign-in: without session', () => {
    // 🐶 1. Vérifie que l'utilisateur est redirigé vers la page "/sign-in"
    // 🤖 utilise cy.visitSignIn()
  })

  it('Admin shop contains 20 products', () => {
    // 🐶 Connecte toi sur la page d'administation du shop
    // 🐶 verifie qu'il y a bien 20 product
    // 🤖 cy.get('tbody').find('tr').should('have.length', 20)
  })
})

// just for compilation
export const justForCompil = ''
