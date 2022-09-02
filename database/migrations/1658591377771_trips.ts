import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'trips'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.bigInteger('from_city_id').unsigned().references('cities.code')
      table.bigInteger('to_city_id').unsigned().references('cities.code')
      table.integer('seats')
      table.time('trip_time')
      table.string('description')
      table.dateTime('date')
      table.integer('driver_id').unsigned().references('users.id')
      table.decimal('price')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
