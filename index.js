const express = require ("express"); //carregar/iniciar o módulo do express
const app = express(); //criar uma instancia do express 
const bodyParser = require("body-parser"); //carregar/iniciar o body parser
const connection = require("./database/database"); //carregar conexão com banco dados

//importar/carregar o arquivo Router
const categoriesController = require ("./categories/categoriesController"); 
const articlesController = require ("./articles/articlesController");

//Importar os models 
const Article = require ("./articles/Article");
const Category = require ("./categories/Category");

//view engine
app.set('view engine','ejs');

//Static
app.use(express.static('public'));

//bory parser
app.use(bodyParser.urlencoded({extended:false})); //aceita dados de formulários
app.use(bodyParser.json()); //aceita dados formato json 

//database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso");
    }).catch((error)=>{
        console.log(error);
    })

//Dizer pro Express para usar as rotas que eu definir 
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req,res)=>{   //rota principal 
    Article.findAll({
        order: [            //carregar os artigos na forma decrescente
            ['id','DESC']
        ]
    }).then(articles => {

        Category.findAll().then (categories =>{
            res.render("index", {articles:articles, categories:categories});
        })
    });
})

app.get("/:slug", (req,res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then (categories =>{
                res.render("article", {article:article, categories:categories});
            })
        } else{
            res.redirect("/");
        } 
    }). catch(err => {
        res.redirect("/");
    });  
})

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug:slug
        }, 
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then (categories =>{
                res.render("index", {articles:category.articles, categories:categories});
            })
        } else{
            res.redirect("/");
        } 
    }). catch(err => {
        res.redirect("/");
    });    
})

app.listen(8060, ()=>{  //iniciar app com porta e função de call-back
    console.log("O servidor está rodando!");
})
