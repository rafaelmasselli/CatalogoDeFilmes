const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()

const porta = process.env.PORT || 3000;
const db = require('./model/database')
const filmes = require('./model/filme');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/views/public")));
app.use(express.urlencoded({ extended: true }))

// rota do crud

app.use("/", require("./controller/crud"));

db.conectado();
app.listen(porta, () =>console.log(`Servidor rodando em http://localhost:${porta}`));
