/* eslint-disable import/first */
import {describe, it, afterAll, expect, vi} from 'vitest'
vi.mock('@/db/schema', async () => {
  const db = await setupTestDatabase()
  return {
    default: db.db,
  }
})

import {setupTestDatabase} from './setup-container'
import type {StartedPostgreSqlContainer} from '@testcontainers/postgresql'
import type {Pool} from 'pg'
import type {NodePgDatabase} from 'drizzle-orm/node-postgres'
import {createCategoryDao} from '../repositories/category-repository'
import {CreateEditProduct} from '@/services/types/domain/product-types'
import {
  createProductDao,
  getCategoriesDao,
} from '../repositories/product-repository'

describe('Docker Container Database Tests', () => {
  let container: StartedPostgreSqlContainer
  let pool: Pool
  let db: NodePgDatabase

  beforeEach(async () => {
    const setup = await setupTestDatabase()
    container = setup.container
    pool = setup.pool as unknown as Pool
    db = setup.db as unknown as NodePgDatabase
    console.log('Setup db uri', container.getConnectionUri())

    const mockDb = await import('@/db/schema')
    Object.defineProperty(mockDb, 'default', {
      value: db,
      writable: true,
    })
  })

  afterAll(async () => {
    await pool.end()
    await container.stop()
  }, 30_000)

  it('should create a new product with category', async () => {
    const newCategory = {name: 'Test Category'}
    const categoryCreated = await createCategoryDao({name: 'Test Category'})
    expect(categoryCreated).toMatchObject(newCategory)

    const result = await getCategoriesDao()
    console.log('result', result)

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
