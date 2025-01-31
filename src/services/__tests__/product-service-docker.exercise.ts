//🐶 Désactive cette règle pour pouvoir mocker  `/* eslint-disable import/first */`
import {beforeAll, beforeEach, vi, test, describe, expect} from 'vitest'

// 🐶 Importe le `setupTestDatabase`
//import {setupTestDatabase} from '@/db/__tests__/setup-container'

// 🐶 Mocke `db/shema`
// vi.mock('@/db/schema', async () => {
//   const db = await setupTestDatabase()
//   return {
//     default: db.db,
//   }
// })

import {faker} from '@faker-js/faker'
import {createCategoryDao} from '@/db/repositories/category-repository'
import {AuthUser} from '../authentication/type'
import {RoleEnum} from '../types/domain/user-types'

import {setupUserAuthExtentedMocked} from './helper-service-test'
import {
  createProductService,
  getCategoriesService,
  getProductsService,
  updateProductService,
} from '../product-service'
import {CreateProduct, UpdateProduct} from '../types/domain/product-types'

import * as productRepository from '@/db/repositories/product-repository'

import {CreateCategory} from '../types/domain/category-types'

import {NodePgDatabase} from 'drizzle-orm/node-postgres'

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

const getProductTest = () => {
  const product = {
    title: faker.lorem.word({length: 3}),
    description: faker.lorem.paragraph(1),
    price: faker.number.int({max: 1000}),
    image: null,
    createdAt: new Date().toISOString(),
    quantity: faker.number.int({max: 1000}),
    updatedAt: new Date().toISOString(),
  } satisfies CreateProduct
  return product
}

describe.sequential('[Docker][getProductsService] when called', () => {
  // 🐶 Ajoute le code pour mocker la db
  // let db: NodePgDatabase

  // beforeAll(async () => {
  //   const setup = await setupTestDatabase()
  //   db = setup.db as unknown as NodePgDatabase

  //   const mockDb = await import('@/db/schema')
  //   Object.defineProperty(mockDb, 'default', {
  //     value: db,
  //     writable: true,
  //   })
  // })
  beforeEach(() => {
    vi.spyOn(productRepository, 'getProductsDao')
  })
  test('[Everyone] can get products', async () => {
    const product = getProductTest()
    await productRepository.createProductDao(product)
    const result = await productRepository.getProductsDao()
    expect(productRepository.getProductsDao).toBeCalledTimes(1)
    expect(result).not.toStrictEqual([])
  })
})

describe.sequential('[Docker][getCategoriesService] when called', () => {
  // 🐶 Ajoute le code pour mocker la db
  // let db: NodePgDatabase

  // beforeAll(async () => {
  //   const setup = await setupTestDatabase()
  //   db = setup.db as unknown as NodePgDatabase

  //   const mockDb = await import('@/db/schema')
  //   Object.defineProperty(mockDb, 'default', {
  //     value: db,
  //     writable: true,
  //   })
  // })

  const productCategory = {
    id: 'd3519b5d-2c86-4486-be90-0f7ff49a6b2a',
    name: faker.lorem.word({length: 3}),
  } satisfies CreateCategory

  beforeEach(() => {
    vi.spyOn(productRepository, 'getCategoriesDao')
  })
  test('[Everyone] can get categories products', async () => {
    await createCategoryDao(productCategory)
    const result = await getCategoriesService()
    expect(productRepository.getCategoriesDao).toBeCalledTimes(1)
    expect(result).not.toStrictEqual([])
    expect(result).toStrictEqual([productCategory])
  })
})

describe.sequential('[Docker][createProductService] when called', () => {
  const product = {
    title: faker.lorem.word(),
    description: faker.lorem.paragraph(1),
    price: faker.number.float({fractionDigits: 2}),
    image: faker.internet.url(),
    quantity: faker.number.int({max: 100}),
  } satisfies CreateProduct

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(productRepository, 'createProductDao')
  })
  test("[USER] can't create a product", async () => {
    setupUserAuthExtentedMocked(user)
    await expect(
      createProductService(product)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Vous n'êtes pas autorisé à effectuer cette action]`
    )
    expect(productRepository.createProductDao).not.toBeCalled()
  })
  test('[ADMIN] can create a product', async () => {
    const userAdmin = {
      ...user,
      role: RoleEnum.ADMIN,
    }
    setupUserAuthExtentedMocked(userAdmin)
    await createProductService(product)
    expect(productRepository.createProductDao).toBeCalledTimes(1)
    expect(productRepository.createProductDao).toBeCalledWith(product)
  })
})

describe.sequential('[Docker][updateProductService] when called', () => {
  beforeEach(async () => {
    const product = getProductTest()
    await productRepository.createProductDao(product)
    vi.clearAllMocks()
    vi.spyOn(productRepository, 'updateProductDao')
  })

  const newTitle = faker.lorem.word({length: 3})

  test("[USER] can't update a product", async () => {
    setupUserAuthExtentedMocked(user)
    const products = await getProductsService()
    const newProduct = {
      ...products[0],
      category: 'd3519b5d-2c86-4486-be90-0f7ff49a6b2a',
      title: newTitle,
    } satisfies UpdateProduct

    await expect(
      updateProductService(newProduct)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Vous n'êtes pas autorisé à effectuer cette action]`
    )
    expect(productRepository.updateProductDao).not.toBeCalled()
  })

  test('[ADMIN] can update a product', async () => {
    const userAdmin = {
      ...user,
      role: RoleEnum.ADMIN,
    }
    setupUserAuthExtentedMocked(userAdmin)
    const products = await productRepository.getProductsDao()
    const newProduct = {
      ...products[0],
      category: undefined,
      title: newTitle,
    } satisfies UpdateProduct
    await updateProductService(newProduct)
    expect(productRepository.updateProductDao).toBeCalledTimes(1)
    expect(productRepository.updateProductDao).toBeCalledWith(newProduct)
  })
})
export const justForCompil = ''
