import {
  CreateEditProduct,
  UpdateProduct,
} from '@/services/types/domain/product-types'
import {afterAll, beforeAll, describe, expect, test} from 'vitest'
import {createCategoryDao} from '../repositories/category-repository'
import {initDrizzle} from '../repositories/management-repository'
import {
  createProductDao,
  deleteProductDao,
  getProductByNameDao,
  getProductsDao,
  updateProductDao,
} from '../repositories/product-repository'
describe.sequential('CRUD operations for Product', () => {
  beforeAll(async () => {
    // 🐶 Assure-toi que la base de données est initialisée avant de lancer les tests
    // 🤖 Utilise la fonction initDrizzle()
    // await initDrizzle()
  })

  test('should create a new product with category', async () => {
    // 🐶 Crée une nouvelle catégorie pour le produit
    const newCategory = {name: 'Test Category'}
    // 🐶 Utilise createCategoryDao pour créer une catégorie dans la base de données
    //const categoryCreated = await createCategoryDao(newCategory)
    // 🐶 Vérifie que la catégorie créée correspond bien aux données fournies
    //expect(categoryCreated).toMatchObject(newCategory)

    // 🐶 Crée un nouveau produit avec les détails suivants
    const newProduct: CreateEditProduct = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 100,
      image: 'image_url',
      //category: categoryCreated.id, // 🐶 Utilise l'ID de la catégorie créée
      quantity: 10,
    }
    // 🐶 Utilise createProductDao pour créer un produit dans la base de données
    //const createdProduct = await createProductDao(newProduct)
    // 🐶 Vérifie que le produit créé correspond bien aux données fournies
    //expect(createdProduct).toMatchObject(newProduct)
  })

  test('should read a product by name', async () => {
    // 🐶 Récupère la liste des produits existants
    const products = await getProductsDao()
    console.log('products', products)
    // 🐶 Utilise getProductByNameDao pour récupérer un produit par son titre
    //const product = await getProductByNameDao(products[0].title || '')

    // 🐶 Vérifie que le produit récupéré est défini et correspond au produit attendu
  })

  test('should update a product', async () => {
    // 🐶 Récupère la liste des produits existants
    const products = await getProductsDao()
    const productToUpdate = products[0]

    // 🐶 Prépare les nouvelles données à mettre à jour pour ce produit
    const updatedData: UpdateProduct = {
      id: productToUpdate.id, // 🐶 Utilise l'ID du produit existant
      title: 'Updated Product Title',
      description: 'Updated product description',
      price: 120,
      image: 'updated_image_url',
      quantity: 15,
    }
    // 🐶 Utilise updateProductDao pour mettre à jour les données dans la base

    // 🐶 Vérifie que le produit a bien été mis à jour
    // expect(updatedProduct.title).toBe('Updated Product Title')
    // expect(updatedProduct.price).toBe(120)
  })

  test('should delete a product', async () => {
    // 🐶 Récupère la liste des produits existants
    const products = await getProductsDao()
    const productToDelete = {id: products[0].id}

    // 🐶 Utilise deleteProductDao pour supprimer le produit

    // 🐶 Vérifie que le produit n'existe plus dans la base de données
    const deletedProduct = await getProductByNameDao(productToDelete.id || '')
    expect(deletedProduct).toEqual([]) // Le produit ne devrait plus exister
  })
})
export const justForCompile = ''
