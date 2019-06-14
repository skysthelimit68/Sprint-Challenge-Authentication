const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById
}

function add(user) {
    return db("users")
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}

function findById(id) {
    return db("users")
    .where( { id } )
    .first()
}

function findBy(filter) {
    return db("users")
    .where(filter)
}