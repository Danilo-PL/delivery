const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Producto = db.define(
    "producto",
    {
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe un producto con este nombre"
            }
        },
        descripcion:{//ingredientes, estilos, etc.
            type: sequelize.TEXT,
            allowNull: true,
        },
        precio:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        stock:{
            type: sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        tablename: "productos"
    }
);

module.exports = Producto;