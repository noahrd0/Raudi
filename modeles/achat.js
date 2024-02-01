// models/Achat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User  = require('./user');
const Modele = require('./voiture');

const Achat = sequelize.define('achat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateAchat: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    montant: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

Achat.belongsTo(User, { foreignKey: 'clientId' });
User.hasMany(Achat, { foreignKey: 'clientId' });

Achat.belongsTo(Modele, { foreignKey: 'voitureId' });
Modele.hasMany(Achat, { foreignKey: 'voitureId' });

module.exports =  Achat ;
