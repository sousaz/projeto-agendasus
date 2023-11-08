const Consulta = require('../model/Consulta')
const Ubs = require('../model/Ubs')

function filterRepetitiveOptions(data) {
    let newArray = [];

    data.forEach(obj => {
        if (!newArray.includes(obj.tipo)) {
            newArray.push(obj.tipo);
        }
    });

    return newArray;
}

module.exports = {
    async loadOptions(req, res){
        try {
            const consulta = await Consulta.find({}, 'tipo')
            const ubs = await Ubs.find({}, 'nome')
            const tipo = filterRepetitiveOptions(consulta)
            const response = {
                tipoConsulta: tipo,
                nomeUbs: ubs,
            }
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ msg: 'Erro na consulta'})
        } 
    },
}