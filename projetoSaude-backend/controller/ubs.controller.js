const Ubs = require("../model/ubs.model")

module.exports = {
    async all(req, res) {
        try {
            const ubs = await Ubs.findAll()
            res.status(200).json(ubs)
        } catch (error) {
            res.status(400).json({ error: 'Erro na ubs'})
        }
    },
    async create(req, res) {
        try {
            const ubs = await Ubs.create(req.body)
            res.status(200).json("inserido na tabela ubs com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao adicionar na tabela ubs'})
        }
    },

    async update(req, res) {
        try {
            const id_ubs = req.params.id

            const ubs = await Ubs.findOne({ where: { id_ubs } } )

            if(!ubs) {
                return res.status(400).json("Ubs não encontrada")
            }

            ubs.usuario = req.body.usuario
            ubs.senha = req.body.senha
            ubs.nome = req.body.nome
            ubs.id_endereco = req.body.id_endereco

            await ubs.save()
            res.status(201).json("Ubs atualizada com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar ubs'})
        }
    },
    async one(req, res) {
        try {
            const id_ubs = req.params.id
            
            const ubs = await Ubs.findOne({ where: { id_ubs } } )
            
            if(!ubs) {
                return res.status(400).json("Ubs não encontrada")
            }
            res.status(200).json(ubs)
        } catch (error) {
            res.status(400).json({ error: 'Ubs não encontrada'})
        }
    },
    async delete(req, res) {
        try {
            const id_ubs = req.params.id

            const ubs = await Ubs.destroy({ where: {id_ubs} })
            if(!ubs) {
                return res.status(400).json("Ubs não encontrada")
            }

            res.status(201).json("ubs apagada")
        } catch (error) {
            res.status(400).json({ error: 'Ubs não encontrada'})
        }
    },
}