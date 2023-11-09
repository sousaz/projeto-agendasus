const Endereco = require("../model/endereco.model")

module.exports = {
    async all(req, res) {
        try {
            const endereco = await Endereco.findAll()
            res.status(200).json(endereco)
        } catch (error) {
            res.status(400).json({ error: 'Erro na endereco'})
        }
    },
    async create(req, res) {
        try {
            const endereco = await Endereco.create(req.body)
            res.status(200).json("inserido na tabela endereco com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao adicionar na tabela endereco'})
        }
    },

    async update(req, res) {
        try {
            const id_endereco = req.params.id

            const endereco = await Endereco.findOne({ where: { id_endereco } } )

            if(!endereco) {
                return res.status(400).json("Endereco não encontrada")
            }

            endereco.cep = req.body.cep
            endereco.rua = req.body.rua
            endereco.bairro = req.body.bairro
            endereco.cidade = req.body.cidade
            endereco.estado = req.body.estado

            await endereco.save()
            res.status(201).json("Endereco atualizada com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar endereco'})
        }
    },
    async one(req, res) {
        try {
            const id_endereco = req.params.id

            const endereco = await Endereco.findOne({ where: { id_endereco } } )

            if(!endereco) {
                return res.status(400).json("Endereco não encontrada")
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(400).json({ error: 'Endereco não encontrada'})
        }
    },
    async delete(req, res) {
        try {
            const id_endereco = req.params.id

            const endereco = await Endereco.destroy({ where: {id_endereco} })
            if(!endereco) {
                return res.status(400).json("Endereco não encontrada")
            }

            res.status(201).json("endereco apagada")
        } catch (error) {
            res.status(400).json({ error: 'Endereco não encontrada'})
        }
    },
}