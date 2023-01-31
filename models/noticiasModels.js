var pool = require('./db')

async function getNews(){
    try {
        var query = 'select * from noticias order by fecha desc';
        var rows = await pool.query(query);
        return rows
    } catch (error) {
        console.log(error);
    }
}

async function addNews(data){
    //console.log(data);
    try {
        var query = 'insert into noticias set ?';
        var rows = await pool.query(query, [data]);
        return rows
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function deleteNews(id){
    try {
        var query = 'delete from noticias where id = ?';
        var rows = await pool.query(query, [id]);
        return rows
    } catch (error) {
        console.log(error);
    }
}

async function getNewsById(id){
    try {
        var query = 'select * from noticias where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0]
    } catch (error) {
        console.log(error);
    }
}

async function modifyNewsById(newNew, id){
    try {
        var query = 'update noticias set ? where id = ?';
        var rows = await pool.query(query, [newNew, id]);
        return rows
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getNews, addNews, deleteNews, getNewsById, modifyNewsById }