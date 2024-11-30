const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Restaurante = db.define(
    "restaurante",
    {
        nombre: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe un producto con este nombre"
            }
        },
        direccion: {
            type: sequelize.TEXT,
            allowNull: false,
        },
        telefono: {
            type: sequelize.STRING(15),
            allowNull: true,
        }
    },
    {
        tableName: "restaurantes"
    }
);

module.exports = Restaurante;
