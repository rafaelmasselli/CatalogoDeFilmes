const {Sequelize}  = require('sequelize');
const database = require("./database");

const Filme = database.sequelize.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: Sequelize.STRING,
  
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diretor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Filme;