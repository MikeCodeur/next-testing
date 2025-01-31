// 🐶 Désactive cette règle `ESLIint` pour autoriser du code avant les imports
// 🤖 /* eslint-disable import/first */
import {describe, it, afterAll, expect, vi} from 'vitest'

// 🐶 Importe du `setup` de la base de données (dockers tests)
//import {setupTestDatabase} from './setup-container'

// 🐶 Mocke `@/db/schema` avant les imports des `DAO`
// 🤖
// vi.mock('@/db/schema', async () => {
//   const setup = await setupTestDatabase()
//   return {
//     default: setup.db,
//   }
// })

import type {StartedPostgreSqlContainer} from '@testcontainers/postgresql'
import type {Pool} from 'pg'
import type {NodePgDatabase} from 'drizzle-orm/node-postgres'
import {createCategoryDao} from '../repositories/category-repository'
import {CreateEditProduct} from '@/services/types/domain/product-types'
import {createProductDao} from '../repositories/product-repository'

// 🐶 Normalement le premier test devrait s'exécuter correctement
// Mais pas le second : `error: duplicate key value violates unique constraint "product_title_unique"`
// Pourquoi ? Le titre du produit est unique dans la table `products`
// Si on veut une instance vierge à chaque test, il faut utiliser `beforeEach`
// et mocker une nouvelle instance de la base de données
describe('Docker Container Database Tests', () => {
  let container: StartedPostgreSqlContainer
  let pool: Pool
  let db: NodePgDatabase

  // 🐶 Mocke une nouvelle instance de la base de données
  // beforeEach(async () => {
  //   const setup = await setupTestDatabase()
  //   container = setup.container
  //   pool = setup.pool
  //   db = setup.db as unknown as NodePgDatabase
  //   console.log('Setup db uri', container.getConnectionUri())

  //   const mockDb = await import('@/db/schema')
  //   Object.defineProperty(mockDb, 'default', {
  //     value: db,
  //     writable: true,
  //   })
  // })

  afterAll(async () => {
    await pool.end()
    await container.stop()
  }, 30_000)

  it('should create a new product with category', async () => {
    const newCategory = {name: 'Test Category'}
    const categoryCreated = await createCategoryDao({name: 'Test Category'})
    expect(categoryCreated).toMatchObject(newCategory)

    const newProduct: CreateEditProduct = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      image: 'image_url',
      category: categoryCreated.id,
      quantity: 10,
    }

    const createdProduct = await createProductDao(newProduct)
    expect(createdProduct).toMatchObject(newProduct)
  })

  it('should create a new product with category', async () => {
    const newCategory = {name: 'Test Category'}
    const categoryCreated = await createCategoryDao({name: 'Test Category'})
    expect(categoryCreated).toMatchObject(newCategory)

    const newProduct: CreateEditProduct = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      image: 'image_url',
      category: categoryCreated.id,
      quantity: 10,
    }

    const createdProduct = await createProductDao(newProduct)
    expect(createdProduct).toMatchObject(newProduct)
  })
})

export const justForTest = ''
