var db_config = require('../../config/connect-gis');

var knex = require('knex')({
    client: 'mysql',
    connection: db_config
});

class user {
    list() {
        let sql = "select id,username,email from user"
        return knex.raw(sql)

    }
}

module.exports = user;