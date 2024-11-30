const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Recibo = db.define(
    "recibo",
    {
        fecha_emision:{
            type: sequelize.DATE,
            allowNull: false,
        },
        monto_total:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },
    },
    {
        tablename: "recibos"
    }
);

module.exports = Recibo;