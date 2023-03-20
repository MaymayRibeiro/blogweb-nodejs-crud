//Definir rotas relacionadas aos artigos da aplicação
const express = require ("express"); //carregar o express
const router = express.Router(); // carregar objeto para criar rotas
const Category = require ("../categories/Category");
const Article = require ("./Article");
const slugify = require ("slugify");

router.get("/admin/articles", (req,res)=>{
    Article.findAll({
        include: [{model: Category}]  //devido ao relacionamento eu consigo puxar esses dados 
    }).then(articles => {
        res.render("admin/articles/index", {articles:articles});
    });
}); 

router.get("/admin/articles/new", (req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new", {categories: categories});
    }) 
});

router.post("/articles/save", (req,res)=> {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req,res)=>{  //rota para deletar categorias
    var id = req.body.id; //parâmetro
    if (id != undefined){ //verificar se o id é válido
        if(!isNaN(id)){ 
            Article.destroy({ //destruir minha categoria quando tiver um id = ao passsado na minha requisição
                where: {
                    id:id
                }
            }).then(()=> {//feito isso vou redirecionar o usuário
                res.redirect("/admin/articles");
            });
        }else{ //não for um número
            res.redirect("/admin/articles");;
        }   
    } else { //Null
        res.redirect("/admin/articles");               
    }
});

//exportar para linkar ao arquivo principal
module.exports = router;