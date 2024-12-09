const { schema } =require('cassandra-odmk');

const colaboradorSchema = new schema({
    id: { type: 'uuid', default: 'uuid()' },
    nome: { type: 'text', required: true },
    email: { type: 'text', required: true },
    funcao: { type: 'text', required: true },
    setor: { type: 'text', required: true },
    iniciojornada: { type: 'text' },
    fimjornada: { type: 'text' },
    // Lista de plantoes onde cada registro tem 'data' (timestamp) e 'atividade' (text)
    plantoes: {
        type: 'list',
        typeDef: '<frozen<map<timestamp, text>>>',
    },
}, { table_name: 'colaboradores' });

module.exports = colaboradorSchema    