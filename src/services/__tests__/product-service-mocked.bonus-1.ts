import {faker} from '@faker-js/faker'
import {describe, it, vi, expect, beforeEach} from 'vitest'
import * as productRepository from '@/db/repositories/product-repository'
import {
  getProductsService,
  getCategoriesService,
  createProductService,
} from '../product-service'
import {setupUserAuthExtentedMocked} from './helper-service-test'
import {RoleEnum} from '../types/domain/user-types'
import {AuthUser} from '../authentication/type'

vi.mock('@/db/repositories/product-repository', () => ({
  getProductsDao: vi.fn(),
  getCategoriesDao: vi.fn(),
  createProductDao: vi.fn(),
}))

vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
  getUserAuthExtented: vi.fn(),
}))
const user = {
  role: RoleEnum.USER,
  session: {
    expires: new Date().toDateString(),
    user: {
      email: faker.internet.email(),
      name: faker.person.firstName(),
    },
  },
} satisfies AuthUser
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

describe('[createProductService] when called', () => {
  const product = {
    title: faker.lorem.word(),
    description: faker.lorem.paragraph(1),
    price: faker.number.float(),
    image: faker.internet.url(),
    quantity: faker.number.int(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("[USER] can't create a product", async () => {
    setupUserAuthExtentedMocked(user)
    await expect(createProductService(product)).rejects.toThrowError()
    expect(productRepository.createProductDao).not.toBeCalled()
  })

  it('[ADMIN] can create a product', async () => {
    const userAdmin = {
      ...user,
      role: RoleEnum.ADMIN,
    }
    setupUserAuthExtentedMocked(userAdmin)
    await createProductService(product)
    expect(productRepository.createProductDao).toBeCalledTimes(1)
  })
})
//juste pour l'exercice
export const justForCompile = 'justForCompile'
