const mongoose = require('mongoose');

//chamando todos os dados que provavelmente vao ser usados (só por garantia)
const ClientesController = require('../controllers/clientes')
const ProdutosController = require('../controllers/produtos')
const ClientesModel = require('../models/clientes')
const ProdutosModel = require('../models/produtos')
const ResumosModel = require('../models/resumos')
const IndexController = require('../controllers/index')

const resumoSchema = new mongoose.Schema({
    cliente: {
      type: mongoose.Schema.Types.ObjectId, //no banco de dados ele ta pegando os objetos por id
      ref: 'clientes', //coleção clientes
      required: true
    },
    produtos: [{
      type: mongoose.Schema.Types.ObjectId,//no banco de dados ele ta pegando os objetos por id
      ref: 'produtos', //coleção produtos
      required: true
    }]
  });

//por medidada de "segurança" ao salvar os clientes no resumo e os produtos eles serão salvos de forma que sejam passados por ID, e nao pelos dados logo de cara
//assim quem tiver acesso ao id podera consultar
const Resumo = mongoose.model('Resumo', resumoSchema);

module.exports = Resumo; 