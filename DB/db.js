const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER
    , password: process.env.DB_PASSWORD
    , server: process.env.DB_SERVER
    , database: process.env.DB_DATABASE
    , options: {
        encrypt: process.env.DB_ENCRYPT === 'true'
    }
};

let pool;

async function getConnection() {
    try {

        if (pool){
            return pool;
        }

        pool = await sql.connect(dbConfig);
        return pool;

    } catch(err){
        console.error("Error al conectar a la base de datos", err)
    }
}

module.exports = {
    sql, getConnection
}