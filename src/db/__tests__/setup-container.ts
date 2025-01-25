import {PostgreSqlContainer} from '@testcontainers/postgresql'
import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

import * as todos from '../schema/todos'
import * as users from '../schema/users'
import * as categories from '../schema/categories'
import * as products from '../schema/products'
import * as accounts from '../schema/accounts'
import {sql} from 'drizzle-orm'
import {migrate} from 'drizzle-orm/postgres-js/migrator'

export async function setupTestDatabase() {
  const container = await new PostgreSqlContainer()
    .withDatabase('test-db')
    .withUsername('test-user')
    .withPassword('test-password')
    .start()

  // Utiliser postgres-js comme en dev
  const pool = postgres(container.getConnectionUri(), {max: 1})

  const schema = {
    ...todos,
    ...users,
    ...categories,
    ...products,
    ...accounts,
  }

  const db = drizzle(pool, {schema})

  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  await migrate(db, {migrationsFolder: 'drizzle/migrations'})
  // console.log('DB properties:', Object.keys(db))
  // console.log('Has query:', 'query' in db)
  // console.log('Query methods:', db.query ? Object.keys(db.query) : 'No query')
  return {container, pool, db}
}
