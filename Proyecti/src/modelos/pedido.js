const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Pedido = db.define(
    "pedido",
    {
        estado: {
            type: sequelize.ENUM('procesando','entregado'), 
            allowNull: false,
            defaultValue: 'procesando'
        },
        fecha: {
            type: sequelize.DATE,
            allowNull: false,
        },
        total: {
            type: sequelize.DOUBLE,
            allowNull: false,
        }
    },
    {
        tableName: "pedidos"
    }
);

module.exports = Pedido;
