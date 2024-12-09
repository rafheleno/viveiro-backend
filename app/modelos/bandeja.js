const {model} = require('cassandra-odm');
const bandejaSchema = require('../esquemas/bandejaSchema');

class Bandeja extends model{}
module.exports = Bandeja.criarModelo('Bandeja',bandejaSchema);