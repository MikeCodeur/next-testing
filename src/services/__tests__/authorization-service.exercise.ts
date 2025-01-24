import {describe, expect, it, beforeEach, vi} from 'vitest'
import {RoleEnum, User} from '../types/domain/user-types'
import {
  canCreateProduct,
  canReadProduct,
} from '../authorization/authorization-service'
import {faker} from '@faker-js/faker'
import {setupUserAuthExtentedMocked} from './helper-service-test'

// 🐶 Crée une fonction pour générer des utilisateurs de test avec faker
const createTestUser = (role: RoleEnum) => ({
  role,
  user: {
    id: faker.string.uuid(), // 🐶 Utilise faker.string.uuid()
    email: faker.internet.email(), // 🐶 Utilise faker.internet.email()
    name: faker.person.firstName(), // 🐶 Utilise faker.person.firstName()
    image: null,
  },
  session: {
    expires: new Date().toDateString(),
    user: {
      email: faker.internet.email(),
      name: faker.person.firstName(),
    },
  },
})

// 🐶 Mocke le module auth-service
vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
  getUserAuthExtented: vi.fn(),
}))

describe('Authorization Service', () => {
  beforeEach(() => {
    // 🐶 Réinitialise tous les mocks avant chaque test
    vi.clearAllMocks()
  })

  describe('canCreateProduct', () => {
    it('should return false when no user is connected', async () => {
      // 🐶 Mocke le comportement pour qu’aucun utilisateur ne soit connecté
      await setupUserAuthExtentedMocked()

      // 🐶 Appelle la fonction canCreateProduct
      const result = await canCreateProduct()

      // 🐶 Vérifie que le résultat est false
      expect(result).toBe(false)
    })

    it('should return true when user is admin', async () => {
      // 🐶 Crée un utilisateur admin
      const adminUser = createTestUser(RoleEnum.ADMIN)

      // 🐶 Mocke le comportement pour qu’un utilisateur admin soit connecté
      await setupUserAuthExtentedMocked(adminUser)

      // 🐶 Appelle la fonction canCreateProduct
      const result = await canCreateProduct()

      // 🐶 Vérifie que le résultat est true
      expect(result).toBe(true)
    })

    it('should return false when user is not admin', async () => {
      // 🐶 Crée un utilisateur classique
      const regularUser = createTestUser(RoleEnum.USER)

      // 🐶 Mocke le comportement pour qu’un utilisateur non admin soit connecté
      await setupUserAuthExtentedMocked(regularUser)

      // 🐶 Appelle la fonction canCreateProduct
      const result = await canCreateProduct()

      // 🐶 Vérifie que le résultat est false
      expect(result).toBe(false)
    })
  })

  describe('canReadProduct', () => {
    it('should always return true', async () => {
      // 🐶 Appelle directement la fonction canReadProduct
      const result = await canReadProduct()

      // 🐶 Vérifie que le résultat est true
      expect(result).toBe(true)
    })
  })
})
export const justForCompile = 'justForCompile'
