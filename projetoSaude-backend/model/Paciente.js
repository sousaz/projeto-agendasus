const mongoose = require('mongoose')

const Paciente = mongoose.model('Paciente', {
    email: String,
    senha: String,
    cpf: String,
    nome: String,
    sobrenome:String,
    data_nasc: String,
    numero_sus: String,
    id_endereco: String,
    admin: Boolean
})

module.exports = Paciente