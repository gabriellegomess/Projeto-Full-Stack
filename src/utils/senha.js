const bcrypt = require('bcrypt')

async function crypto(pwd){
      //pegando a senha do usuario e criptografando ela para salvar no banco
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(pwd, salt)
    //retornando a senha para salvar no banco
    return password
}
    
//exportando como objeto caso tenha mais funções dentro dela
module.exports = {
    crypto,
}