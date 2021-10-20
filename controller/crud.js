const express = require("express");
const router = express.Router();
const filmes = require('.././model/filme');

let mensagem = ""

router.get("/",  async (req, res) => {
  const filme = await filmes.findAll();
    setTimeout(() => { mensagem = "";}, 5000);
  res.render("../views/index", {mensagem,filme});
});

// cadastro

router.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

// cadastro do render

router.post("/New", async (req, res) => {

  const {nome,genero,image,diretor,ano} = req.body;
  const filme = await filmes.create({
    nome:nome,
    genero:genero,
    imagem:image,
    diretor:diretor,
    ano:ano,
  })
  if (!nome){
res.redirect("/cadastro" ,{mensagem: "tabela nome esta vazia"})
  }else if  (!genero)
  {
res.redirect("/cadastro" ,{mensagem: "tabela genero esta vazia"})
  }else if  (!image) 
  {
res.redirect("/cadastro" ,{mensagem: "tabela de imagem esta vazia"})
  }else if  (!diretor) 
  {
res.redirect("/cadastro" ,{mensagem: "tabela de diretor esta vazia"})
  }else if  (!ano) 
  {
res.redirect("/cadastro" ,{mensagem: "tabela de ano esta vazia"})
  };
  mensagem = `O Filme ${nome} foi adicionado`
res.redirect("/"),filme})
 
//render detalhe

router.get("/detalhes/:id", async function (req, res){
  const filme = await filmes.findByPk(req.params.id);
  res.render("../views/detalhes",{filme:filme})

});

// deletar do render

router.get("/deletar/:id", async (req, res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {
    res.render("../views/deletar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("../views/deletar", {
    filme,
  });
});

// render delete

router.post('/deletar/deletar/:id', async (req,res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {    
    res.render("../views/deletar",  {mensagem: "Filme não encontrado!",});};

  await filme.destroy();
  const filmesList = await filmes.findAll();
  res.render("../views/index", {mensagem: `Filme deletado com sucesso!`,  filme:filmesList});
});


// editar do render

router.get('/editar/:id', async (req,res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {
    res.render("../views/deletar", {
      mensagem: "Filme não encontrado!",
    });
  }
  
  var options = [ 
    "Animação", "Comédia", "Comédia Romântica", "Comédia Dramática", "Documentário", "Drama","Faroeste", "Ficção Científica", "Musical", "Suspense", "Terror / Horror"];
  for ( var i = 0; i < options.length; i++ )
  {
      var selected = (filme.genero == i ) ? "selected" : "";
  }

  res.render("../views/editar", {filme:filme});
});


// editar no render 

router.post("/editar/:id", async function (req,res){
    const filme = await filmes.findByPk(req.params.id);
    const { nome, genero, image, diretor, ano} = req.body;
    
    filme.id = req.params.id;
    filme.nome = nome;
    filme.genero = genero;
    filme.imagem = image;
    filme.diretor = diretor;
    filme.ano = ano;

    mensagem = `O Filme ${nome} foi alterado com sucesso!`
  
    await filme.save();
    res.render("../views/editar",{filme,mensagem});
});


module.exports = router