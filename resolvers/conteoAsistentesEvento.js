const { getConnection, sql } = require('../DB/db'); 
const { Query } = require('./valoracion');

const conteoAsistentesEventoResolver = {
    Query: {
        conteoAsistentesEvento: async () => {
            const pool = await getConnection();
            const result = await pool.request()
            .query(`
                select 
                    E.id
                    , E.titulo
                    , E.direccion
                    , E.fecha
                    , COUNT( RA.asistente_id ) conteo
                from user_events.REGISTRO_ASISTENTES RA
                INNER join user_events.EVENTOS E 
                on RA.evento_id = E.id
                GROUP BY E.id
                    , E.titulo
                    , E.direccion
                    , E.fecha
            `);

            return result.recordset.map( row => ({
                conteo: row.conteo
                , evento: {
                    id: row.id
                    , titulo: row.titulo
                    , direccion: row.direccion
                    , fecha: row.fecha
                }
            }));
        }
    }
}

module.exports = conteoAsistentesEventoResolver;