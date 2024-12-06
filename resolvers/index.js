const { mergeResolvers } = require('@graphql-tools/merge');

const valoracionResolvers = require('./valoracion')
const asistentesResolvers = require('./asistentes')
const registroAsistenteResolvers = require('./registroAsistente')
const eventosResolver = require('./eventos')
const conteoAsistentesEventoResolver = require('./conteoAsistentesEvento')

const resolversArray = [
    valoracionResolvers
    , asistentesResolvers
    , registroAsistenteResolvers
    , eventosResolver
    , conteoAsistentesEventoResolver
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;