const sequelize = require('sequelize');
const db = require('../configuracion/db');

const DetallePedido = db.define(
    "detalle_pedido",
    {
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        precio: {
            type: sequelize.DOUBLE,
            allowNull: false,
        }
    },
    {
        tableName: "detalles_pedido"
    }
);

module.exports = DetallePedido;
