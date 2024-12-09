const {model} = require('cassandra-odm');
const colaboradorSchema =require('../esquema/colaboradorSchema');

class Colaborador extends model{}
module.exports = Colaborador.criarModelo('Colaborador',colaboradorSchema);