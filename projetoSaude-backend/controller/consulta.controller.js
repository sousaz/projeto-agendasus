const Consulta = require("../model/consulta.model")

module.exports = {
    async all(req, res) {
        try {
            const consulta = await Consulta.findAll()
            res.status(200).json(consulta)
        } catch (error) {
            res.status(400).json({ error: 'Erro na consulta'})
        }
    },
    async create(req, res) {
        try {
            const consulta = await Consulta.create(req.body)
            res.status(200).json("inserido na tabela consulta com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao adicionar na tabela consulta'})
        }
    },

    async update(req, res) {
        try {
            const id_consulta = req.params.id

            const consulta = await Consulta.findOne({ where: { id_consulta } } )

            if(!consulta) {
                return res.status(400).json("Consulta não encontrada")
            }

            consulta.horario = req.body.horario
            consulta.data = req.body.data
            consulta.id_paciente = req.body.id_paciente
            consulta.id_medico = req.body.id_medico

            await consulta.save()
            res.status(201).json("Consulta atualizada com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar consulta'})
        }
    },
    async one(req, res) {
        try {
            const id_consulta = req.params.id

            const consulta = await Consulta.findOne({ where: { id_consulta } } )

            if(!consulta) {
                return res.status(400).json("Consulta não encontrada")
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(400).json({ error: 'Consulta não encontrada'})
        }
    },
    async delete(req, res) {
        try {
            const id_consulta = req.params.id

            const consulta = await Consulta.destroy({ where: {id_consulta} })
            if(!consulta) {
                return res.status(400).json("Consulta não encontrada")
            }

            res.status(201).json("consulta apagada")
        } catch (error) {
            res.status(400).json({ error: 'Consulta não encontrada'})
        }
    },
}