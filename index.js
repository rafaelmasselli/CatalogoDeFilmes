const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()

const porta = process.env.PORT || 3000;
const db = require('./model/database')
const filmes = require('./model/filme');

let mensagem = ""

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))

// render com a mensagem 

app.get("/",  async (req, res) => {
  const filme = await filmes.findAll();
    setTimeout(() => { mensagem = "";}, 5000);
  res.render("index", {mensagem,filme});
});

// render cadastro

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

// render cadastro, redirect index principal

app.post("/New", async (req, res) => {  
  const {nome,genero,image,diretor,ano} = req.body;
  const filme = await filmes.create({
    nome:nome,
    genero:genero,
    imagem:image,
    diretor:diretor,
    ano:ano,
  })
  mensagem = `O Filme ${nome} foi adicionado`
res.redirect("/"),filme})

// render detalhes com id <a>

app.get("/detalhes/:id", async function (req, res){
  const filme = await filmes.findByPk(req.params.id);
  res.render("../views/detalhes",{filme:filme})
});

// render deleter

app.get("/deletar/:id", async (req, res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("deletar", {
    filme,
  });
});

app.post('/deletar/deletar/:id', async (req,res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {    
    res.render("deletar",  {mensagem: "Filme não encontrado!",});};

  await filme.destroy();

  const filmesList = await filmes.findAll();
  res.render("index", {mensagem: `Filme deletado com sucesso!`,  filme:filmesList});
});

//render editar

app.get('/editar/:id', async (req,res) => {
  const filme = await filmes.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
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

app.post("/editar/:id", async function (req,res){
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
    res.render("../views/editar",{filme,mensagem:`o filme ${nome} foi alterado`})
});

app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));
