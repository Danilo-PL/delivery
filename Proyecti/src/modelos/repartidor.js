const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Repartidor = db.define(
    "repartidor",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        telefono: {
            type: sequelize.STRING(15),
            allowNull: false,
        },
        vehiculo: {
            type: sequelize.STRING(20), 
            allowNull: false,
        }
    },
    {
        tableName: "repartidores"
    }
);

module.exports = Repartidor;
