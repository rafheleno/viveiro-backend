const express = require('express');
const rota = express.Router();


const tarefaControl = require('../app/controles/tarefaControl');


rota.post('/tarefas', tarefaControl.novaTarefa);
rota.get('/tarefas', tarefaControl.mostrarTarefas);

module.exports = rota;
