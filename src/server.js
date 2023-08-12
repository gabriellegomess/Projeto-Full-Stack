//nome de server para identificar mais facilmente quem iria iniciar o projeto/servidor
//esta pagina serve apenas para iniciar o servidor para rodar ele pelo terminal
//consequentemente esta é a pagina que chama as rotas e o banco de dados

//importando o express e o path e inicializando o express
const express = require('express')
const path = require('path') //manipular caminhos de arquivos e diretórios na biblioteca


//conexao com o banco de dados
const db = require('./database')

//chamando o arquivos das rotas para rodar a aplicação
const routes = require('./routes')


//iniciando o express
const app = express()



//conexao com o banco de dados (primeira tentativa)
//db.connect()


//definindo o template engine - é uma biblioteca que permite inserir 
//código JavaScript em HTML. Isso significa que a aplicação usará arquivos EJS 
//para renderizar as páginas.
app.set('view engine', 'ejs')

//especificando o local correto da pasta view (o path vai especificar a biblioteca/pasta/etc q vai estar, 'views') //o dirname ja esta na pasta src
//especificando o diretório onde os arquivos de visualização (views) estão localizados. 
//A função path.join é usada para combinar o caminho atual (__dirname) com o subdiretório 'views'. 
//Isso permite que o Express encontre os arquivos de visualização corretamente.
app.set('views', path.join(__dirname, 'views'))


//definindo os arquivos públicos
//configura o Express para servir arquivos estáticos localizados na pasta 'public'. 
//Isso significa que qualquer arquivo nessa pasta poderá ser acessado diretamente pelo 
//navegador, sem a necessidade de uma rota específica. 
//Os arquivos estáticos geralmente incluem arquivos CSS, JavaScript e imagens.
app.use(express.static(path.join(__dirname, 'public')))


//habilitar o server para receber dados via post (do formulário)
//habilitando o middleware express.urlencoded para processar dados enviados via POST de um 
//formulário HTML. O middleware analisa o corpo da requisição e popula o objeto req.body 
//com os dados enviados pelo formulário. O parâmetro extended permite que dados mais 
//complexos sejam enviados no corpo da requisição.
app.use(express.urlencoded({ extended: true}))


//usando as rotas da api //definindo as rotas
app.use('/', routes)

//erro 404 (not found)
app.use((req, res) => { //middleware
    res.send('Página não encontrada!')
})

//executando o servidor (o listen vem ao final de tudp)
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`));