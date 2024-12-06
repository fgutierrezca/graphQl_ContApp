const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Asistente {
        id: ID!
        nombre: String!
        correo: String!
        edad: Int
        eventos: [RegistroAsistente]
    }

    type Evento {
        id: ID!
        titulo: String!
        direccion: String!
        fecha: String!
        asistentes: [RegistroAsistente]
    }

    type Valoracion {
        id: ID!
        descripcion: String!
    }

    type RegistroAsistente {
        asistente: Asistente
        evento: Evento
        valoracion: Valoracion
    }

    type ConteoAsistentesEvento {
        evento: Evento
        conteo: Int
    }

    type Query {
        asistentes( nombre: String ): [Asistente]
        eventos( titulo: String ): [Evento]
        valoraciones: [Valoracion]
        conteoAsistentesEvento: [ConteoAsistentesEvento]
    }

`

module.exports = typeDefs;