const mongoose = require('mongoose')

const Ubs = mongoose.model('Ubs', {
    usuario: String,
    senha: String,
    nome: String,
    id_endereco: String
})

module.exports = Ubs