//Definir rotas relacionadas as categorias da aplicação
const express = require ("express"); //carregar o express
const router = express.Router(); // carregar objeto para criar rotas
const Category = require ("./Category"); //carregar o model Category
const slugify = require("slugify"); //carregar o slugify

//rota para cadastrar categoria
router.get ("/admin/categories/new", (req,res)=>{
    res.render("admin/categories/new");
});

//rota para criação de categoria no banco de dados
router.post ("/categories/save", (req,res)=>{
    var title = req.body.title;      //pegar dados do form com body-parser
    if (title != undefined){  //verificar se o valor enviado pelo usuário é válido ou não

        Category.create({   //salvar no banco de dados
            title: title,
            slug: slugify(title) //versão do título ultimizada para URL's  
        }).then(()=>{
            res.redirect("/admin/categories"); //redirecionar para rota principal
        })
        
    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get ("/admin/categories", (req,res)=>{ //mostrar tela da lista de categorias criadas
    Category.findAll().then(categories => {  //chamar meu model chamado Category e o then me retorna as categories
        res.render("admin/categories/index", {categories:categories}); //abre um json e passo minhas categorias para meu frontend
    });  
});

router.post("/categories/delete", (req,res)=>{  //rota para deletar categorias
    var id = req.body.id; //parâmetro
    if (id != undefined){ //verificar se o id é válido
        if(!isNaN(id)){ 
            Category.destroy({ //destruir minha categoria quando tiver um id = ao passsado na minha requisição
                where: {
                    id:id
                }
            }).then(()=> {//feito isso vou redirecionar o usuário
                res.redirect("/admin/categories");
            });
        }else{ //não for um número
            res.redirect("/admin/categories");;
        }   
    } else { //Null
        res.redirect("/admin/categories");               
    }
});

router.get("/admin/categories/edit/:id", (req, res) => { //rota para editar categorias, vai receber o id da categoria que quero editar
    var id = req.params.id; //receber um id dos parâmetros da minha rota
    Category.findByPk(id).then(category => { //findByPk = pesquisar categoria pelo id
        
        if (isNaN(id)){  //verificar se o id não é um número
            res.redirect("/admin/categories");  //se ele não for um número 
        }

        if(category != undefined){  //verificar se essa categoria é nula 
            res.render("admin/categories/edit",{category: category}); //se for ok passar ela para a view
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {  //se der erro
        res.redirect("/admin/categories");        
    })
});

//rota para salvar edição de categorias
router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title) },{ //update = atualizar no Sequelize
        where: {
            id: id       //atualizar o título da categoria quando 
        }
    }).then(() => {
        res.redirect("/admin/categories");    
    })
});

//exportar para linkar ao arquivo principal
 module.exports = router;
