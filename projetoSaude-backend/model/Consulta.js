const mongoose = require('mongoose')

const Consulta = mongoose.model('Consulta', {
    horario: String,
    data: String,
    tipo: String,
    id_paciente: String,
    id_medico: String
})

module.exports = Consulta