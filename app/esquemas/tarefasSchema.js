const {shema} = require('cassandra-odm');

const tarefasSchema = new Schema({
    id:{type:'uuid',default:'uuid'},
    tipo:{type: 'text',required:true},
    colaborador:{type:'text',required:true},
    responsavel:{type:'text',required:true},
    origem:{type:'text',required:true},
    destino:{type:'text',required:true},
    prioridade:{type:Int, required:true},
    vencimento:{type:'timestamp',default:'toTimestamp(now())'},
    observacao:{type:'text'},
    marcador: {type:Int, required:true },},{table_name:'ativos'});
    
    module.exports= model('Tarefa',tarefasSchema)