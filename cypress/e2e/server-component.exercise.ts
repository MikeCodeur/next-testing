import {CreateProduct} from '@/services/types/domain/product-types'

describe('Server Component', () => {
  it('Sign-in: without session', () => {
    // 🐶 1. Vérifie que l'utilisateur est redirigé vers la page `/sign-in`
    // 🤖 utilise cy.visitSignIn()
  })

  it('Admin shop contains 20 products', () => {
    // 🐶 Connecte toi sur la page d'administation du shop
    // 🐶 Vérifie qu'il y a bien 20 products
    // 🤖 cy.get('tbody').find('tr').should('have.length', 20)
  })
})

// Just for compilation
export const justForCompil = ''
