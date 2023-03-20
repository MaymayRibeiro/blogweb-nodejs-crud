const Sequelize = require("sequelize"); //importar/carregar sequelize

//criar um objeto/variável de conexão (informações de conexão)json{informações servidor}
const connection = new Sequelize('guiapress','root','arnold33',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});

//exportar a variável de conexão para usar em outros arquivos
module.exports = connection;