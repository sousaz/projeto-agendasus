const Paciente = require("../model/Paciente")

module.exports = {
    async all(req, res) {
        try {
            const paciente = await Paciente.find()
            res.status(200).json(paciente)
        } catch (error) {
            res.status(400).json({ error: 'Erro no paciente'})
        }
    },
    async create(req, res) {
        const { email, senha, cpf, nome, sobrenome, data_nasc, numero_sus, id_endereco } = req.body

        const paciente = new Paciente({
            email,
            senha,
            cpf,
            nome,
            sobrenome,
            data_nasc,
            numero_sus,
            id_endereco
        })

        try {
            await paciente.save()
            res.status(200).json("inserido na tabela paciente com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao adicionar na tabela paciente'})
        }
    },

    async update(req, res) {
        try {
            const id_paciente = req.params.id

            const paciente = await Paciente.findById(id_paciente)

            if(!paciente) {
                return res.status(400).json("Paciente não encontrada")
            }

            paciente.email = req.body.email
            paciente.senha = req.body.senha
            paciente.cpf = req.body.cpf
            paciente.nome = req.body.nome
            paciente.sobrenome = req.body.sobrenome
            paciente.data_nasc = req.body.data_nasc
            paciente.numero_sus = req.body.numero_sus
            paciente.id_endereco = req.body.id_endereco

            await paciente.save()
            res.status(201).json("Paciente atualizada com sucesso")
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar paciente'})
        }
    },
    async one(req, res) {
        try {
            const id_paciente = req.params.id

            const paciente = await Paciente.findById(id_paciente)
            
            if(!paciente) {
                return res.status(400).json("Paciente não encontrada")
            }
            res.status(200).json(paciente)
        } catch (error) {
            res.status(400).json({ error: 'Paciente não encontrada'})
        }
    },
    async delete(req, res) {
        try {
            const id_paciente = req.params.id

            const paciente = await Paciente.findById(id_paciente)
            await Paciente.deleteOne(paciente._id)
            if(!paciente) {
                return res.status(400).json("Paciente não encontrada")
            }

            res.status(201).json("paciente apagada")
        } catch (error) {
            res.status(400).json({ error: 'Paciente não encontrada'})
        }
    },
}