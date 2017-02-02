
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('user_name', 'varchar(255)').defaultTo('').notNullable();
        table.string('email', 'varchar(255)').defaultTo('').notNullable();
        table.specificType('hashed_password', 'char(60)').defaultTo('').notNullable();
        table.string('home_station', 'varchar(255)').defaultTo('').notNullable();
        table.string('away_station', 'varchar(255)').defaultTo('').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
