const TarefaService = require('../modelos/tarefas');

class tarefaControle{

    static async novaTarefa(req,res){
        try{
            const tarefa = await tarefaControle.novaTarefa(req.body);
            res.status(201).json(tarefa);
        } catch (err){
            res.status(400).json({error:err.massage});
        }
    }


    static async mostrarTarefas(req,res){

        try{
            const tarefas = await tarefaControle.buscarTarefaResponsavel(req.query.status);
            res.json(tarefas);
        } catch (err) {
            res.status(400).json({error:err.message});
        }

    }
}
module.exports = tarefaControle;