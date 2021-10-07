const express = require("express");
const app = express();
const porta = 3000;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
let message = "";


app.get("/", (req, res) => {
    setTimeout(() => {
    message = "";
  }, 5000);
  res.render("../views/index",{message});
});

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

app.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});
app.get("/detalhes", (req, res) => {
  res.render("../views/detalhes");
});


app.post("/info", (req, res) => {
  const{nome} = req.body;

message = `O Filme ${nome} foi adicionado`
  res.redirect("/")
})


app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));


