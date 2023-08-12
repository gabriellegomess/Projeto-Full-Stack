const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nome: { type:  String, required: true},
    idade: {type: Number, required: true},
    cpf: { type:  String, required: true, unique: true},
    telefone: { type:  Number, required: true},
    email: { type:  String, required: true},
    senha: { type:  String, required: true},
    endereco: { type:  String, required: true},
})

const Model = mongoose.model('clientes', schema)

module.exports = Model