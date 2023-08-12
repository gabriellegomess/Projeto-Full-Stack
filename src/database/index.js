
//importar o moongose para se conectar no banco de dados 
const mongoose = require("mongoose");

//se conectando no banco de dados / Define a URL do banco de dados que será utilizado na conexão
const db = "mongodb://0.0.0.0:27017/projeto";

// Cria uma função assíncrona autoexecutável que tentará se conectar ao banco de dados
(async () => {
    try {
// Aguarda a conexão com o banco de dados utilizando as opções especificadas (os "use" são coisas que o mongo precisa para conectar)
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
// Se a conexão for estabelecida com sucesso, exibe uma mensagem de sucesso
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (err) {
// Se houver algum erro durante a conexão, exibe uma mensagem de erro com a descrição do erro
        console.error("Erro ao conectar-se ao banco de dados: ", err);
    }
})(); 


//primeira tentativa

/*
const mongoose = require('mongoose')


function connect(){

//mongoose.set('useNewUrlParser', true)
//mongoose.set('useUnifiedTopology', true)

//se conectando no banco de dados
mongoose.connect('mongodb://localhost:27017');

//criando uma constante chamada db
const db = mongoose.connection

//uma vez que executar eu qro conectar e ter callback (certeza de q esta conectado)
db.once('open', () => {
    console.log('Conectado com o banco de dados!')
});

//caso de um erro (avisar):
db.on('error', () => console.log('Error ao conectar'));
db.on('error', console.error.bind(console, 'connection error: '))

}

module.exports = {
    connect
} */


