const { getConnection } = require('../DB/db');

const valoracionResorlver = {
    Query: {
        valoraciones: async () => {
            try{
                const pool = await getConnection();
                const result = await pool.request().query(`
                    select * from user_events.VALORACIONES
                `);
                return result.recordset ;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }
};

module.exports = valoracionResorlver;