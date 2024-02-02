const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Modele = require('./voiture');

const Option = sequelize.define('option', {
    type: {
        type: DataTypes.ENUM('Volant', 'Couleur', 'Jantes', 'Phares', 'Sièges', 'Toit'),
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    modeleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Modele,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

Modele.hasMany(Option, { foreignKey: 'modeleId' });
Option.belongsTo(Modele, { foreignKey: 'modeleId' });

Option.sync();

module.exports = Option;