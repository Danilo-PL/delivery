const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Venta = db.define(
    "venta",
    {
        fecha: {
            type: sequelize.DATE,
            allowNull: false,
        },
        total: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },
    },
    {
        tablename: "ventas"
    }
);

module.exports = Venta;