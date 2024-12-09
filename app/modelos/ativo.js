const {model} = require('cassandra-odm');
const ativoSchema = require('../esquemas/ativoSchema');

class Ativo extends model{}
module.exports = Ativo.criarModelo('Ativo',ativoSchema);