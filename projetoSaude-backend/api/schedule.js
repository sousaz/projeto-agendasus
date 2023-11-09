const Paciente = require('../model/Paciente')
const Medico = require('../model/Medico')
const Consulta = require('../model/Consulta')
const Ubs = require('../model/Ubs')
const limit = 10

module.exports = {
    async loadSchedule(req, res) {
        const { page, ubs, tipo } = req.params
        try {
            const consulta = await Consulta.find({ id_paciente: null, id_ubs: ubs, tipo: tipo }).skip(page * limit - limit).limit(limit)
            res.status(200).json(consulta)
        } catch (error) {
            res.status(400).json({ msg: 'Erro na consulta'})
        }
    },
    async saveSchedule(req, res) {
        const { horario, data, tipo, id_medico, id_ubs } = req.body

        if(!horario)
            return res.status(422).json({ msg: "O horario é obrigatório!" })
        if(!data)
            return res.status(422).json({ msg: "A data é obrigatório!" })
        if(!tipo)
            return res.status(422).json({ msg: "O tipo de consulta é obrigatório!" })
        if(!id_medico)
            return res.status(422).json({ msg: "O médico é obrigatório!" })
        if(!id_ubs)
            return res.status(422).json({ msg: "A ubs é obrigatório!" })

        const consultaExiste = await Consulta.findOne({ horario, data })

        if(consultaExiste)
            return res.status(422).json({ msg: "Choque de horario!" })

        const medicoExiste = await Medico.findById(id_medico)

        if(!medicoExiste)
            return res.status(422).json({ msg: "médico não cadastrado!" })

        const ubsExiste = await Ubs.findById(id_medico)

        if(!ubsExiste)
            return res.status(422).json({ msg: "ubs não cadastrado!" })

        const consulta = new Consulta({
            horario,
            data,
            tipo,
            id_medico,
            id_ubs,
        })

        try {
            await consulta.save()
            res.status(200).json({ msg: "inserido na tabela consulta com sucesso" })
        } catch (error) {
            res.status(400).json({ msg: 'Erro ao adicionar na tabela consulta' })
        }
    },
    async makeSchedule(req, res) {
        const { horario, data, tipo, id_medico, id_paciente } = req.body
        const id = req.params.id

        if(!horario)
            return res.status(422).json({ msg: "O horario é obrigatório!" })
        if(!data)
            return res.status(422).json({ msg: "A data é obrigatório!" })
        if(!tipo)
            return res.status(422).json({ msg: "O tipo de consulta é obrigatório!" })
        if(!id_medico)
            return res.status(422).json({ msg: "O médico é obrigatório!" })
        if(!id_paciente)
            return res.status(422).json({ msg: "O paciente é obrigatório!" })

        const consultaExiste = await Consulta.findById(id)

        if(!consultaExiste)
            return res.status(422).json({ msg: "Consulta não disponivel!" })

        const pacienteExiste = await Paciente.findById(id_paciente)

        if(!pacienteExiste)
            return res.status(422).json({ msg: "Paciente não existe!" })

        try {
            consultaExiste.horario = horario
            consultaExiste.data = data
            consultaExiste.tipo = tipo
            consultaExiste.id_medico = id_medico
            consultaExiste.id_paciente = id_paciente

            await consultaExiste.save()
            res.status(200).json({ msg: "atualizado na tabela consulta com sucesso" })
        } catch (error) {
            res.status(400).json({ msg: 'Erro ao atualizar na tabela consulta' })
        }
    }, 
    async loadUserSchedule(req, res) {
        const id = req.params.id
        const page = req.params.page
        try {
            const consulta = await Consulta.find({ id_paciente: id }).skip(page * limit - limit).limit(limit)
            res.status(200).json(consulta)
        } catch (error) {
            res.status(400).json({ msg: 'Erro na consulta'})
        }
    },
    async teste(req, res) {
        const id = req.params.id
        try {
            const consulta = await Consulta.find().skip(id * limit - limit).limit(limit)
            res.status(200).json(consulta)
        } catch (error) {
            res.status(400).json({ msg: 'Erro na consulta'})
        }
    }
}