const db = require("../../data/dbConfig")

const accountsTable = "accounts"

function get(id) {
    if(id) {
        return db.table(accountsTable)
            .where(id, "=", "id")
    } else {
        return db.table("accounts")
    }
}

function insert(data) {
    return db.table(accountsTable)
        .insert(data, "id")
        .then(([id]) => get(id))
}

function edit(id, data) {
    return db.table(accountsTable)
        .where(id, "=", "id")
        .update(data)
        .then((changed) => (changed > 0 ? get(id) : null))
}

function remove(id) {
    return db.table(accountsTable)
        .where(id, "=", id)
        .delete
}

module.exports = {
    get,
    insert,
    edit,
    remove,
};
