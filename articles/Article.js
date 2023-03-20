const Sequelize = require ("sequelize"); //Importar o Sequelize
const connection = require ("../database/database"); // Conexão com o banco de dados
const Category = require ("../categories/Category"); //Importar o model a se relacionar

const Article = connection.define ('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


Category.hasMany(Article);//Uma categoria tem muitos artigos = 1 para n
Article.belongsTo(Category);//Um artigo pertence a uma categoria = 1 para 1

module.exports = Article;
