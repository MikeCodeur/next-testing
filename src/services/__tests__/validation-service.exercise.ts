import {describe, expect, it} from 'vitest'
import {faker} from '@faker-js/faker'
import {
  deleteProductServiceSchema,
  createEditProductServiceSchema,
  updateProductServiceShema,
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
        //🐶 utilise un ID invalide
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
      //🐶 appel createEditProductServiceSchema avec les données valides
    })

    it('should reject invalid title length', () => {
      const invalidProduct = {
        ...validProduct,
        // 🐶 met un title trop court
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
        // 🐶 met un description trop court
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
        // 🐶 missing category, title, and description
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
