const ResumoModel = require('../models/resumos');
const ClientesModel = require('../models/clientes');
const ProdutosModel = require('../models/produtos');

const ClientesController = require('../controllers/clientes')
const ProdutosController = require('../controllers/produtos')

const ResumosModel = require('../models/resumos')
const IndexController = require('../controllers/index')

async function createResumo(req, res) {
    try {
      const { clienteId, produtosIds } = req.body; //vai pegar o id do cliente e do produto para passar 
  
      // Verificar se o cliente e os produtos existem
      const cliente = await ClientesModel.findById(clienteId); //esta verificando se eles existem
      const produtos = await ProdutosModel.find({ _id: { $in: produtosIds } });
  
      if (!cliente || produtos.length !== produtosIds.length) {
        // Cliente ou produtos não encontrados, retornar erro
        return res.status(404).json({ error: 'Cliente ou produtos não encontrados' });
      }
  
      // Obtendo os nomes do cliente e dos produtos
      const clienteNome = cliente.nome;
      const produtosNomes = produtos.map(produto => produto.nome);
  
      // Criando o resumo com os dados fornecidos
      const resumo = new ResumoModel({
        cliente: clienteId,
        produtos: produtosIds
      });
  
      // Salvar o resumo no banco de dados
      await resumo.save();
  
      // Retornar uma resposta de sucesso com os dados do resumo
      return res.status(200).render('sucesso', {
        message: 'Formulário enviado com sucesso!',
        resultado: {
          clienteNome: clienteNome,
          produtosNomes: produtosNomes
        }
      });
    } catch (error) {
      // Tratar erros e retornar uma resposta de erro adequada
      console.error('Erro ao criar resumo:', error);
      return res.status(500).render('error', {
        message: 'Erro ao enviar o formulário. Por favor, tente novamente.'
      });
    }
  }
//lista de resumo
  async function listResumos(req, res) {
    try {
      const resumos = await ResumosModel.find().populate('cliente produtos');
      res.render('resumos', {
        title: 'Lista de Resumos',
        resumos: resumos
      });
    } catch (error) {
      res.status(500).send('Erro ao carregar a lista de resumos');
    }
  }
  
  module.exports = {
    createResumo,
    listResumos,
  };

