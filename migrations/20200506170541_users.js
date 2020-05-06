
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.string("username").notNull().unique()
    table.string("password").notNull()
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
}
