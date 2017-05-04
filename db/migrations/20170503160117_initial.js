// knex migrate:latest
// knex migrate:make initial
// knex migrate:rollback

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', function(table) {
      table.increments('id').primary()
      table.string('folder_name')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('urls', function(table) {
      table.increments('id').primary()
      table.string('url_name')
      table.string('long_url')
      table.integer('visit_count')
      table.integer('folder_id').unsigned()
      table.foreign('folder_id')
        .references('folders.id')

      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('urls'),
    knex.schema.dropTable('folders')
  ])
}