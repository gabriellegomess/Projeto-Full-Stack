const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nome: {type: String, required: true},
    marca: {type: String, required: true},
    cod: {type: Number, required: true},
    idp: {type: Number, required: true, unique: true},
})

const Model = mongoose.model('produtos', schema)

module.exports = Model