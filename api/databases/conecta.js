import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "trabahofinal3", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});

// senha: Teste123*