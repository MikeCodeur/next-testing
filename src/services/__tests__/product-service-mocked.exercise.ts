// 🐶 Importe les modules nécessaires
import {describe, it, vi, beforeEach} from 'vitest'

// 🐶 Mocke les DAO pour simuler les données
vi.mock('@/db/repositories/product-repository', () => ({
  getProductsDao: vi.fn(),
  getCategoriesDao: vi.fn(),
}))

describe('[getProductsService] when called', () => {
  beforeEach(() => {
    // 🐶 Mocke les produits retournés par le DAO
  })

  it('[Everyone] can get products', async () => {
    // 🐶 Appelle getProductsService et vérifie que le DAO est appelé
  })
})

describe('[getCategoriesService] when called', () => {
  beforeEach(() => {
    // 🐶 Mocke les catégories retournées par le DAO
  })

  it('[Everyone] can get categories products', async () => {
    // 🐶 Appelle getCategoriesService et vérifie que le résultat contient les bonnes catégories
  })
})

//juste pour l'exercice
export const justForCompile = 'justForCompile'
