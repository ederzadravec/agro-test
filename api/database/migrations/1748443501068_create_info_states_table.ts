import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'info_states'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().index()

      table.string('name').notNullable()
      table.string('uf', 2).notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
