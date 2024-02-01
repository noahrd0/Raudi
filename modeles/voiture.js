const DataTypes = require('sequelize');
const sequelize = require('../database/database');

const Modele = sequelize.define('modele', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    places: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carburant : {
        type: DataTypes.ENUM('essence', 'diesel', 'electrique'),
        allowNull: false
    },
    prix: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true
});

Modele.sync({ alter : true });

module.exports = Modele;