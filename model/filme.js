const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const Filme = database.sequelize.define("filmes", {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Diretor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Ano: {
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