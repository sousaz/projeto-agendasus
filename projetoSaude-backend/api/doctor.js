const Medico = require("../model/Medico")


module.exports = {
    async createDoctor(req, res) {
        const { cpf, nome, crm, especialidade } = req.body

        if(!cpf)
            return res.status(422).json({ msg: "O cpf é obrigatório!" })
        if(!nome)
            return res.status(422).json({ msg: "O nome é obrigatório!" })
        if(!crm)
            return res.status(422).json({ msg: "O crm é obrigatório!" })
        if(!especialidade)
            return res.status(422).json({ msg: "A especialidade é obrigatório!" })

        const doutorExiste = await Medico.findOne({ cpf })

        if(doutorExiste)
            return res.status(422).json({ msg: "Médico já cadastrado!" })

        const medico = new Medico({
            cpf, nome, crm, especialidade
        })

        try {
            await medico.save()
            res.status(200).json({ msg: "inserido na tabela medico com sucesso" })
        } catch (error) {
            res.status(400).json({ msg: 'Erro ao adicionar na tabela medico' })
        }
    }
}