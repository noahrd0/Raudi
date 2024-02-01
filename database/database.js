const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.PORT
});

module.exports = sequelize;