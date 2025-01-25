import {PostgreSqlContainer} from '@testcontainers/postgresql'
import {sql} from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/node-postgres'
import {migrate} from 'drizzle-orm/node-postgres/migrator'
import {Pool} from 'pg'
import {todos} from '../schema/todos'
import {accounts, users} from '../schema/users'
import {categories} from '../schema/categories'
import {products} from '../schema/products'

export async function setupTestDatabase() {
  const container = await new PostgreSqlContainer()
    .withDatabase('test-db')
    .withUsername('test-user')
    .withPassword('test-password')
    .start()

  const pool = new Pool({
    connectionString: container.getConnectionUri(),
  })

  const db = drizzle(pool, {
    schema: {...todos, ...users, ...categories, ...products, ...accounts},
  })

  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  // Exécuter les migrations
  await migrate(db, {migrationsFolder: 'drizzle/migrations'})

  return {
    container,
    pool,
    db,
  }
}
