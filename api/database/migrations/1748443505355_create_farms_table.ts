import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().index()
      table
        .integer('productor_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('productors')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('city').notNullable()
      table.integer('state_id').notNullable().unsigned().references('id').inTable('info_states')
      table.integer('total_area').notNullable()
      table.integer('areable_area').notNullable()
      table.integer('vegetation_area').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
