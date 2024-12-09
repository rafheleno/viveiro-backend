const { text } = require('body-parser');
const { schema } = require('cassandra-odm');

const ativoSchema = new schema({

    id: {type: 'uuid',default: 'uuid'},
    nome: {type:'text',required:true},
    tipo: {type:'text',required:true},
    localizacao:{type:'text', required:true},
    estado:{type:'text'},
    dataaquisicao:{type:'timestamp',default:'toTimestamp(now())'},
    imagem:{type:'text'},
    aream3:{type:Float32Array,required:true},
    capacidade:{type:Int16Array,required:true},
    finalidade:{type:'text',required:true},
    identificador:{type:'text',required:true},
    modelo:{type:'text',required:true},
    ano:{type:'text',rrequired:true},
    alimentacao:{type:'text'},
},{table_name:'ativos'});

module.exports = ativoSchema;