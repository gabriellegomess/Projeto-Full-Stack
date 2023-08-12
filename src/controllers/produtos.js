const ProdutosModel = require('../models/produtos')


//caso um dia precise mexer na msg de cadastro é só alterar essa constante ao inves de função por função
const defaultTitle = 'Cadastro de Produtos'

//titulo da pagina
function index(req, res) {
    res.render('registroProdutos', {
        title: defaultTitle,
    })
}

async function add(req, res) {
    const {
        nome, 
        marca,
        cod,
        idp,
    } = req.body

    const produto = new ProdutosModel({
        nome, 
        marca,
        cod,
        idp,
    })

    produto.save()

    res.render('registroProdutos', {
        title: defaultTitle,
        message: 'Cadastro de produto realizado com sucesso!'
    })

}

//a lista vai ser um array de produtos onde vai listar os produtos
async function listProdutos(req, res) {
    const produtos = await ProdutosModel.find()
//procurando os produtos cadastrados da para passar parametros 
//o find vazio vai retornar todos
    res.render('listProdutos', {
        title: 'Listagem de Produtos!',
        produtos,
    })
}

async function indexEdit(req, res) {
    //query string sao os parametros q a url recebe
    const { id } = req.query

    const produto = await ProdutosModel.findById(id)

    res.render('editProdutos', {
        title: 'Editar Produto',
        produto,
    })
}

async function edit(req, res) {
    const{
        nome,
        marca,
        cod,
        idp,
    } = req.body

    const { id } = req.params

    const produto = await ProdutosModel.findById(id)

    produto.nome = nome,
    produto.marca = marca,
    produto.cod = cod,
    produto.idp = idp,

    produto.save()

    res.render('editProdutos', {
        title: 'Editar Produto',
        produto,
        message: 'Produto alterado com sucesso!'
    })
}

async function excluir(req, res) {
    const { id } = req.params

    const excluir = await ProdutosModel.deleteOne({_id: id})

    if(excluir.ok) {
        res.redirect('/listProdutos')
    }
}

module.exports = {
    index,
    add,
    listProdutos,
    indexEdit,
    edit,
    excluir,
}