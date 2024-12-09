const Ativo = require('../models/Ativo');

class ativoControle {
    static async criarAtivo(req, res){
        try{
            const ativo = new Ativo(req.body);
            await ativo.save();
            res.status(201).json(ativo);
        } catch(err){
            res.status(500).json({error:err.message});
        }
        
    }

    static async mostraAtivos(req, res) {
        try {
            const ativos = await ativos.find();
            res.json(ativos);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}
module.exports = ativoControle;