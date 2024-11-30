const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Cliente = db.define(
    "cliente",
    {
        identidad:{
            type: sequelize.STRING(13),
            allowNull: false,
        },
        nombre:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        telefono:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
        correo:{
            type: sequelize.STRING(50),
            allowNull: true,
        },
        direccion:{
            type: sequelize.TEXT,
            allowNull: true,
        }
    },
    {
        tablename: "clientes"
    }
);

module.exports = Cliente;
