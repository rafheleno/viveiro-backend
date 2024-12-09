const express = require('express');
const bodyParse = require('body-parse');
const routes = require('./rotas/rota');
const ClienteCassandra = require('./app/utils/CassandraClient');

const apl = expreess();
const PORTA = process.env.PORT || 3000;

apl.use(bodyParse.json());
apl.use('/api',routes);

apl.listen(PORT,async()=>{

    try{
        await ClienteCassandra.connect();
        console.log('Cassandra rodando najorta $(PORT)');

    } catch(err) {
        console.error('Não foi possivel conectar com o cassandra');
    }

})