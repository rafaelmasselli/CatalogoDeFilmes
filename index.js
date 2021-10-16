const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()
const porta = process.env.PORT;
const db = require('./model/database')

const filmes = require('./model/filme');


let message = ""

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))

// render com a mensagem 

app.get("/",  async (req, res) => {
  const filme = await filmes.findAll();
    setTimeout(() => { message = "";}, 5000);
  res.render("index", {message,filme});});


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
  const {nome,genero,image,autor,ano} = req.body;
  const filme = await filmes.create({
 nome:nome,
 genero:genero,
 image:image,
 autor:autor,
 ano:ano,
  })
message = `O Filme ${nome} foi adicionado`
res.redirect("/")})

// render detalhes com id <a>

app.get("/detalhes/:id", async function (req, res){
  const filme = await filmes.findByPk(req.params.id);
  res.render("../views/detalhes",{filme:filme})
});

// render deleter

app.get("/deletar", function (req,res){
  res.render("../views/deletar")
});


//render editar

app.get("/editar/:id", async function (req,res){
    const filme = await filmes.findByPk(req.params.id);
    const { nome, genero, image, autor,ano} = req.body;
    
    filme.nome = nome;
    filme.genero = genero;
    filme.image = image;
    filme.autor = autor;
    filme.ano = ano;
    
    await filme.save();
    res.redirect("/");  
    res.render("../views/editar",{filme})
});




db.conectado();
app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));
