const express = require("express");
const app = express();
const porta = 3000;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
let message = "";

// teste crud js puro

const filmes = [{
  nome:"capitao",
  genero:"acao",
  image:"https://a-static.mlcdn.com.br/1500x1500/dvd-capitao-america-o-primeiro-vingador-rimo/campinascomercio2/1678014411/6352bfcb6d963f1f0b3fd68f558e6bf2.jpg",
  autor:"stalen"
},
{
  nome:"capita",
  genero:"acao",
  image:"https://upload.wikimedia.org/wikipedia/pt/5/59/Captain_Marvel_%282018%29.jpg",
  autor:"stalen"

}]

// render com a mensagem 

app.get("/", (req, res) => {
    setTimeout(() => {
    message = "";
  }, 5000);
  res.render("../views/index",{message});
});

// render cadastro

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

// render pos cadastro com teste de node js, e mensagem 5 s

app.post("/New", (req, res) => {  
  const {nome} = req.body;  
message = `O Filme ${nome} foi adicionado`
  res.redirect("/")
})

//    const {nome,image,autor,genero} = req.body;
 // const New = {nome:nome,image:image,autor:autor,genero:genero}

//filmes.push(New)


// render detalhes com id <a>

app.get("/detalhes/:id", function (req, res){
  const id = req.params.id;
  const filme = filmes[id]
  res.render("../views/detalhes",{filme,filmes})
});

// render deleter

app.get("/deletar", function (req,res){
  res.render("../views/deletar")
});


//render editar

app.get("/editar", function (req,res){
  res.render("../views/editar")
});

app.get("/detalhes",function (req,res){
  res.render("../views/detalhes")
});




app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));


