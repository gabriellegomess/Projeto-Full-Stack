const router = require('express').Router() //importando o metodo router do express para rodar a aplicação


const ClientesController = require('../controllers/clientes')
const ClientesModel = require('../models/clientes')
const ProdutosController = require('../controllers/produtos')
const ProdutosModel = require('../models/produtos')
const ResumosModel = require('../models/resumos');
const IndexController = require('../controllers/index')
const ResumosController = require('../controllers/resumos');
//rotas da aplicação Este trecho de código implementa uma rota HTTP que define o comportamento do servidor quando ele recebe uma requisição GET na raiz da URL


//"pagina inicial"
router.get('/', IndexController.index)
router.get('/', function(req, res) {
    res.render('index');
  });

//===========CLIENTE============

//registro (esse vai retornar a msg de que o cadastro foi realizado)
router.get('/registro', ClientesController.index)

//quando cair na rota de adc um nv cliente ele vai chamar a função de adiconar la do controller
router.post('/registro/add', ClientesController.add)


//rota para listar os usuarios
router.get('/list', ClientesController.listUsers)


//editar os clientes
router.get('/edit', ClientesController.indexEdit) //renderizar a pagina
router.post('/edit/:id', ClientesController.edit) //editar o usuario de fato baseado no parametro q esta recebendo

//excluidar usuario
router.post('/remove/:id', ClientesController.excluir)


//===========PRODUTO============
//registro (esse vai retornar a msg de que o cadastro foi realizado)
router.get('/registroProdutos', ProdutosController.index)

//quando cair na rota de adc um nv cliente ele vai chamar a função de adiconar la do controller
router.post('/registroProdutos/add', ProdutosController.add)

//rota para listar os produtos
router.get('/listProdutos', ProdutosController.listProdutos)

//editar os produtos
router.get('/editProdutos', ProdutosController.indexEdit)//renderizar a pagina
router.post('/editProdutos/:id', ProdutosController.edit)//editar o produto de fato baseado no parametro q esta recebendo

//excluir produto
router.post('/removeProdutos/:id', ProdutosController.excluir)

//===========VENDA============

//lista dos resumos dos pedidos 
router.get('/resumos', ResumosController.listResumos);

//tudo que o formulário vai enviar (clientes disponiveis, produtos disponiveis) e vai enviar para o resumo
router.get('/formulario', async function(req, res) {
    try {
      const clientes = await ClientesModel.find(); //procurando no bd os clientes disponiveis em tempo real da aplicação
      const produtos = await ProdutosModel.find(); //procurando no bd os produtos disponiveis em tempo real da aplicação
  
      res.render('formulario', { //como o formulário sera retornado para a view (como vai ficar a indentação desse formulário no navegador)
        title: 'Formulário',
        clientes: clientes,
        produtos: produtos,
        resultado: null,
      });
    } catch (error) {
      // Trate o erro de consulta ao banco de dados aqui
      res.status(500).send('Erro ao carregar o formulário');
    }
  });

  router.post('/formulario/add', async function(req, res) { //apos passar pelo bd e pelos clientes/produtos disponiveis vai retornar pro usuário
    try {
      const { cliente, produtos } = req.body;
  
      // Criar um novo documento de resumo
      const resumo = new ResumosModel({
        cliente: cliente, //retorna os clientes disponiveis para seleção (para serem selecionados)
        produtos: produtos //retorna os produtos disponiveis para selecionar
      });
  
      // Salvar o resumo no banco de dados
      await resumo.save(); //vai salvar o cliente e produto selecionado na coleção resumo no bando de dados
  
      // Redirecionar para a página inicial (index)
      res.redirect('/');
    } catch (error) {
      // Tratar erros de validação ou de salvamento no banco de dados
      res.render('error', {
        message: 'Erro ao enviar o formulário. Por favor, tente novamente.'
      });
    }
  }); 


  router.get('/resumos', async function(req, res) { //pagina de resumo e oq vai mostrar
    try {
      const resumos = await ResumosModel.find().populate('clientes produtos')
      res.render('resumos', {
        title: 'Lista de Resumos',
        resumos: resumos //esse resumos vem do banco de dados (no qual os dados foram enviados diretamente do formulario para essa coleção e aq ta printando ela na tela)
      });
    } catch (error) {
      res.status(500).send('Erro ao carregar a lista de resumos');
    }
  });
  
//===========RESUMO DA VENDA============
router.get('/resumos', ResumosController.listResumos);


//exportando o router
module.exports = router