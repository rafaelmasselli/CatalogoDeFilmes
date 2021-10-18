const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()
const porta = process.env.PORT;
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


app.get("/filme", async (req, res) => {
  const filme = await filmes.findAll();
  res.json({filme}); 
});

// render cadastro

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

// render cadastro, redirect index principal

app.post("/New", async (req, res) => {  
  const {nome,genero,image,diretor,ano} = req.body;
  const filme = await filmes.create({
    Nome:nome,
    Genero:genero,
    Imagem:image,
    Diretor:diretor,
    Ano:ano,
      })
mensagem = `O Filme ${nome} foi adicionado`
res.redirect("/")})

// render detalhes com id <a>

app.get("/detalhes/:ID", async function (req, res){
  const filme = await filmes.findByPk(req.params.ID);
  res.render("../views/detalhes",{filme:filme})
});

// render deleter

app.get("/deletar/:ID", async (req, res) => {
  const filme = await filmes.findByPk(req.params.ID);

  if (!filme) {
    res.render("deletar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("deletar", {
    filme,
  });
});

app.post('/deletar/deletar/:ID', async (req,res) => {
  const filme = await filmes.findByPk(req.params.ID);

  if (!filme) {    
    res.render("deletar", {      
      mensagem: "Filme não encontrado!",    
    });  
  };

  await filme.destroy();

  const filmesList = await filmes.findAll();
  res.render("index", {    
    mensagem: `Filme deletado com sucesso!`,  filme:filmesList});
});


//render editar

app.get('/editar/:ID', async (req,res) => {
  const filme = await filmes.findByPk(req.params.ID);

  if (!filme) {
    res.render("deletar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("../views/editar", {filme: filme});
});

app.post("/editar/:ID", async function (req,res){
    const filme = await filmes.findByPk(req.params.ID);
    const { nome, genero, image, diretor, ano} = req.body;
    
    filme.ID = req.params.ID;
    filme.Nome = nome;
    filme.Genero = genero;
    filme.Imagem = image;
    filme.Diretor = diretor;
    filme.Ano = ano;
    
    await filme.save();
    res.redirect("/");  
    res.render("../views/editar",{filme})
});


db.conectado();
app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));
