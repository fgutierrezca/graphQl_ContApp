const { getConnection , sql } = require('../DB/db');

const registroAsistenteResolver = {
    RegistroAsistente: {
        valoracion: async (parent) => {
            try{
                const pool = await getConnection();
                const result = await pool.request()
                .input( 'valoracion_id', sql.Int , parent.valoracion.id )
                .query(`
                    select * from user_events.VALORACIONES where id=@valoracion_id
                `);
                return result.recordset[0];
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }

};

module.exports = registroAsistenteResolver;