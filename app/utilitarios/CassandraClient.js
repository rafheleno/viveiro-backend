const cassandradb = require('cassandra-driver');

const cliente = new cassandradb.Client({

    IPcassandra: ['127.0.0.1'],
    DataCenterLocal: 'viveiroalambari',
    keyspace: 'logisticaProducao'
});

module.exports = cliente;