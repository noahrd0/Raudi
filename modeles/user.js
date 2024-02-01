const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'comptable'),
    defaultValue: 'user',
  },

}, {
    freezeTableName: true,
});

module.exports =  User  ;
