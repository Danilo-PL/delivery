const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Venta_detalle = db.define(
    "venta_detalle",
    {
        cantidad:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario:{
            type: sequelize.FLOAT,
            allowNull: false
        },
        isv:{
            type: sequelize.DOUBLE,
            allowNull: true
        },
        descuento:{
            type: sequelize.DOUBLE,
            allowNull: true
        },
        subtotal:{
        type: sequelize.DOUBLE,
        allowNull: false
        },
    },
    {
        tablename: "venta_detalles"
    }
);

module.exports = Venta_detalle;