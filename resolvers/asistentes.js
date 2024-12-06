const { getConnection , sql } = require('../DB/db');

const asistentesResolvers = {
    Query: {
        asistentes: async ( _ , args ) => {
            try{
                const pool = await getConnection();
                const request = pool.request();

                let qry = "select * from user_events.ASISTENTES where 1=1"

                if(args.nombre){
                    request.input( 'asistente_nombre' , sql.Int, args.nombre )
                    qry += " and titulo nombre @asistente_nombre "
                }

                const result= await request.query(qry)
                return result.recordset;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    },
    Asistente: {
        eventos: async (parent) => {
            try {
                const pool = await getConnection();
                const result = await pool.request()
                .input( 'asistente_id' , sql.Int , parent.id )
                .query(`
                    select 
                        RA.valoracion_id
                        , RA.evento_id
                        , E.titulo
                        , E.direccion
                        , E.fecha
                    from user_events.REGISTRO_ASISTENTES RA 
                    inner join user_events.EVENTOS E 
                    on RA.evento_id = E.id
                    where asistente_id = @asistente_id
                `);

                return result.recordset.map(row=>({
                    valoracion: { id: row.valoracion_id }
                    , evento: {
                        id: row.evento_id
                        , titulo: row.titulo
                        , direccion: row.direccion
                        , fecha: row.fecha
                    }
                }));
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    }
};


module.exports = asistentesResolvers;