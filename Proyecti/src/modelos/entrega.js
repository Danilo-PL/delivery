const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Entrega = db.define(
    "entrega",
    {
        ruta:{
            type: sequelize.STRING(150),
            allowNull: false,
        },
        hora_salida:{
            type: sequelize.DATE,
            allowNull: false,
        },
        estado:{
            type: sequelize.ENUM('procesando','entregado'),
            allowNull: false,
            defaultValue: 'procesando'
        },
    },
    {
        tablename: "entregas"
    }
);

module.exports = Entrega;
