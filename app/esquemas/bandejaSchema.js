const { schema } = require('cassandra-odm');

const bandejaSchema = new schema({
    id: { type: 'uuid', default: 'uuid()' },
    codigo: { type: 'text', required: true },
    capacidade: { type: 'int', required: true },
    cor: { type: 'text', required: true },
    estado: { type: 'text', required: true },
    dataentrada: { type: 'timestamp', default: 'toTimestamp(now())' },
    // Define cada elemento com chaves e valores do tipo texto, {genetica,tipo plantio,lote}
    quesitos: { 
        type: 'list', 
        typeDef: '<frozen<map<text, text>>>' 
        
    }
}, { table_name: 'bandejas' });

module.exports = bandejaSchema;
