
exports.up = function(knex) {
    return knex.schema.alterTable('accounts', tbl => {
        tbl.dropUnique('name');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('accounts', tbl => {
        tbl.unique('name');
    });
};
