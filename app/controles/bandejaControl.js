const Bandejas = require('../modelos/ativo');

class bandejaControle {
    static async criarBandeja(req, res){
        try{
            const bandeja = new Bandejas(req.body);
            await bandeja.save();
            res.status(201).json(bandeja);
        } catch(err){
            res.status(500).json({error:err.message});
        }
        
    }

    static async mostraBandejas(req, res) {
        try {
            const bandeja = await Bandejas.find();
            res.json(ativos);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}
module.exports = ativoControle;