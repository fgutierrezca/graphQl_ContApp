const { getConnection, sql } = require('../DB/db'); 

const eventosResolvers = {
    Query:{
        eventos: async ( _ , args) => {
            try{
                const pool = await getConnection()
                const request = pool.request();

                let qry = "select * from user_events.EVENTOS where 1=1"

                if( args.titulo ){
                    request.input( "evento_titulo" , sql.VarChar , `%${args.titulo}%` );
                    qry += " and titulo like @evento_titulo "
                }

                const result = await request.query(qry)
                return result.recordset;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    },
    Evento: {
        asistentes: async (parent) => {
            try{
                const pool = await getConnection();
                const result = await pool.request()
                .input( 'evento_id' , sql.Int , parent.id )
                .query(`
                    select
                        RA.valoracion_id
                        , RA.asistente_id
                        , A.nombre
                        , A.correo
                        , A.edad
                    from user_events.REGISTRO_ASISTENTES  RA 
                    inner join user_events.ASISTENTES A 
                    on RA.asistente_id = A.id
                    where evento_id = @evento_id
                `)

                return result.recordset.map( row => ({
                    valoracion: { id: row.valoracion_id }
                    , asistente: {
                        id: row.asistente_id
                        , nombre: row.nombre
                        , correo: row.correo
                        , edad: row.edad
                    }
                }));
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }
};

module.exports = eventosResolvers;