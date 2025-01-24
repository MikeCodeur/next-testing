import {faker} from '@faker-js/faker'
import {describe, it, vi, expect, beforeEach} from 'vitest'
import * as productRepository from '@/db/repositories/product-repository'
import {getProductsService, getCategoriesService} from '../product-service'

vi.mock('@/db/repositories/product-repository', () => ({
  getProductsDao: vi.fn(),
  getCategoriesDao: vi.fn(),
}))

vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
  getUserAuthExtented: vi.fn(),
}))

describe('[getProductsService] when called', () => {
  beforeEach(() => {
    vi.mocked(productRepository).getProductsDao.mockResolvedValue([
      {
        id: faker.string.alphanumeric(10),
        category: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: faker.lorem.paragraph(),
        image: faker.internet.url(),
        price: faker.number.float(),
        quantity: faker.number.int(),
        title: faker.lorem.word(),
      },
    ])
  })

  it('[Everyone] can get products', async () => {
    await getProductsService()
    expect(productRepository.getProductsDao).toBeCalledTimes(1)
  })
})

describe('[getCategoriesService] when called', () => {
  beforeEach(() => {
    vi.mocked(productRepository).getCategoriesDao.mockResolvedValue([
      {id: faker.string.alphanumeric(10), name: 'Electronics'},
      {id: faker.string.alphanumeric(10), name: 'Books'},
    ])
  })

  it('[Everyone] can get categories products', async () => {
    const result = await getCategoriesService()
    expect(productRepository.getCategoriesDao).toBeCalledTimes(1)
    expect(result).toHaveLength(2)
  })
})
//juste pour l'exercice
export const justForCompile = 'justForCompile'
