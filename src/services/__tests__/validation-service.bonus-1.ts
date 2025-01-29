import {describe, expect, it} from 'vitest'
import {faker} from '@faker-js/faker'
import {
  deleteProductServiceSchema,
  createEditProductServiceSchema,
} from '../validations/product-validation'

describe('Product Validation Schemas', () => {
  describe('deleteProductServiceSchema', () => {
    it('should validate correct delete product data', () => {
      const validData = {
        id: faker.string.uuid(),
      }
      const result = deleteProductServiceSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid id', () => {
      const invalidData = {
        id: 123, // number instead of string
      }
      const result = deleteProductServiceSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('createEditProductServiceSchema', () => {
    const validProduct = {
      category: 'Electronics',
      price: 299.99,
      title: 'New Product',
      description: 'A great product description',
    }

    it('should validate correct create product data', () => {
      const result = createEditProductServiceSchema.safeParse(validProduct)
      expect(result.success).toBe(true)
    })

    // BONUS 1
    it('should validate with optional fields', () => {
      const productWithOptionals = {
        ...validProduct,
        id: faker.string.uuid(),
        createdAt: new Date().toISOString(),
        quantity: 10,
      }
      const result =
        createEditProductServiceSchema.safeParse(productWithOptionals)
      expect(result.success).toBe(true)
    })

    it('should coerce numeric strings to numbers', () => {
      const productWithStringNumbers = {
        ...validProduct,
        price: '299.99',
        quantity: '10',
      }
      const result = createEditProductServiceSchema.safeParse(
        productWithStringNumbers
      )
      expect(result.success).toBe(true)
      if (result.success) {
        expect(typeof result.data.price).toBe('number')
        expect(typeof result.data.quantity).toBe('number')
      }
    })

    it('should reject invalid title length', () => {
      const invalidProduct = {
        ...validProduct,
        title: 'A', // too short
      }
      const result = createEditProductServiceSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Title must be at least 2 characters.'
        )
      }
    })

    it('should reject invalid description length', () => {
      const invalidProduct = {
        ...validProduct,
        description: 'A', // too short
      }
      const result = createEditProductServiceSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Description must be at least 2 characters.'
        )
      }
    })

    it('should reject missing required fields', () => {
      const invalidProduct = {
        price: 299.99,
        // missing category, title, and description
      }
      const result = createEditProductServiceSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        const errorFields = result.error.issues.map((issue) => issue.path[0])
        expect(errorFields).toContain('category')
        expect(errorFields).toContain('title')
        expect(errorFields).toContain('description')
      }
    })
  })
})
export const justForCompile = 'justForCompile'
