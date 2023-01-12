var pool = require('./db')
var md5 = require('md5')

async function getUserByLogin(user,pass){
    try {
        var query = 'select * from usuarios where mail = ? and clave = ? limit 1';
        var rows = await pool.query(query, [user, md5(pass)]);
        return rows[0]
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getUserByLogin}