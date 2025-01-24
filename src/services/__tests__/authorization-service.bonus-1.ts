import {describe, expect, it, beforeEach, vi} from 'vitest'
import {RoleEnum, User} from '../types/domain/user-types'
import {
  canCreateProduct,
  canReadProduct,
  hasRoleAdmin,
  hasRole,
  checkRoleHierarchy,
} from '../authorization/authorization-service'
import {setupUserAuthExtentedMocked} from './helper-service-test'
import {AuthUser} from '../authentication/type'
import {faker} from '@faker-js/faker'

// Helper function to create test users
const createTestUser = (role: RoleEnum): AuthUser => ({
  role,
  user: {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.firstName(),
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

vi.mock('@/services/authentication/auth-service', () => ({
  auth: vi.fn(),
  getUserAuthExtented: vi.fn(),
}))

describe('Authorization Service', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
  })

  describe('canCreateProduct', () => {
    it('should return false when no user is connected', async () => {
      await setupUserAuthExtentedMocked()
      const result = await canCreateProduct()
      expect(result).toBe(false)
    })

    it('should return true when user is admin', async () => {
      const adminUser = createTestUser(RoleEnum.ADMIN)
      await setupUserAuthExtentedMocked(adminUser)
      const result = await canCreateProduct()
      expect(result).toBe(true)
    })

    it('should return false when user is not admin', async () => {
      const regularUser = createTestUser(RoleEnum.USER)
      await setupUserAuthExtentedMocked(regularUser)
      const result = await canCreateProduct()
      expect(result).toBe(false)
    })
  })

  describe('canReadProduct', () => {
    it('should always return true', async () => {
      const result = await canReadProduct()
      expect(result).toBe(true)
    })
  })

  describe('hasRoleAdmin', () => {
    it('should return true for admin user', () => {
      const adminUser = createTestUser(RoleEnum.ADMIN)
      expect(hasRoleAdmin(adminUser)).toBe(true)
    })

    it('should return false for non-admin user', () => {
      const regularUser = createTestUser(RoleEnum.USER)
      expect(hasRoleAdmin(regularUser)).toBe(false)
    })

    it('should return false when no user provided', () => {
      expect(hasRoleAdmin()).toBe(false)
    })
  })

  describe('hasRole', () => {
    it('should return true when user has specified role', () => {
      const moderatorUser = createTestUser(RoleEnum.MODERATOR)
      expect(hasRole(RoleEnum.MODERATOR, moderatorUser)).toBe(true)
    })

    it('should return false when user does not have specified role', () => {
      const regularUser = createTestUser(RoleEnum.USER)
      expect(hasRole(RoleEnum.ADMIN, regularUser)).toBe(false)
    })

    it('should return false when no user provided', () => {
      expect(hasRole(RoleEnum.MODERATOR)).toBe(false)
    })
  })
})

export const justForCompile = 'justForCompile'
