const Sequelize = require("sequelize"); //importar o Sequelize
const connection = require("../database/database") //importar nosso script com a conexão com  o banco de dados

//definir nosso model
const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,    //tipo String
        allowNull: false          //Não permitir dados nulos
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false 
    }
})


module.exports = Category;