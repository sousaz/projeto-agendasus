const Medico = require("../model/medico.model")

module.exports = {
    async all(req, res) {
        try {
            const medico = await Medico.findAll()
            res.status(200).json(medico)
        } catch (error) {
            res.status(400).json({ error: 'Erro na medico'})
        }
    },
    async create(req, res) {
        try {
            const medico = await Medico.create(req.body)
            res.status(200).json("inserido na tabela medico com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao adicionar na tabela medico' })
        }
    },

    async update(req, res) {
        try {
            const id_medico = req.params.id

            const medico = await Medico.findOne({ where: { id_medico } } )

            if(!medico) {
                return res.status(400).json("Medico não encontrada")
            }

            medico.cpf = req.body.cpf
            medico.nome = req.body.nome
            medico.crm = req.body.crm
            medico.especialidade = req.body.especialidade
            medico.id_ubs = req.body.id_ubs

            await medico.save()
            res.status(201).json("Medico atualizada com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar medico'})
        }
    },
    async one(req, res) {
        try {
            const id_medico = req.params.id

            const medico = await Medico.findOne({ where: { id_medico } } )

            if(!medico) {
                return res.status(400).json("Medico não encontrada")
            }
            res.status(200).json(medico)
        } catch (error) {
            res.status(400).json({ error: 'Medico não encontrada'})
        }
    },
    async delete(req, res) {
        try {
            const id_medico = req.params.id

            const medico = await Medico.destroy({ where: {id_medico} })
            if(!medico) {
                return res.status(400).json("Medico não encontrada")
            }

            res.status(201).json("medico apagada")
        } catch (error) {
            res.status(400).json({ error: 'Medico não encontrada'})
        }
    },
}