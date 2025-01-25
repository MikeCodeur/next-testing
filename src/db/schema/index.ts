import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'

import * as todos from './todos'
import * as users from './users'
import * as categories from './categories'
import * as products from './products'
import * as accounts from './accounts'

const bddUrl = process.env.POSTGRES_URL ?? ''
const env = process.env.NODE_ENV ?? ''

if (process.env.NODE_ENV === 'test') {
  console.warn('Do not use this schema in test environment', env)
  //throw new Error('Do not use this schema in test environment')
}
console.log('Drizzle ENV:', env)
console.log('Drizzle schema bddUrl:', bddUrl)

export const schema = {
  ...todos,
  ...users,
  ...categories,
  ...products,
  ...accounts,
}
const pool = postgres(bddUrl, {max: 1})
const db = drizzle(pool, {
  schema,
})
console.log('DB properties:', Object.keys(db))
console.log('Has query:', 'query' in db)
console.log('Query methods:', db.query ? Object.keys(db.query) : 'No query')
export default db
