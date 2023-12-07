import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Livro = sequelize.define('livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(9,2),
    allowNull: false
  },
  paginas: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  data: {
    type: DataTypes.DATE(),
    // allowNull: false
  },
  autor: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  capa: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sinopse: {
    type: DataTypes.STRING(500),
    // allowNull: false
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  soma: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
  num: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
}, {
  paranoid: true
});