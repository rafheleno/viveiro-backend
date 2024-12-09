const {model} = require('cassandra-odm');
const tarefaSchema =require('../esquema/tarefaSchema');

class Tarefa extends model{}
module.exports = Tarefa.criarModelo('Tarefa',AtivoSchema);