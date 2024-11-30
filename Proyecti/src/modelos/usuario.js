const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Usuario = db.define(
    "usuario",
    {
        email:{//proveido por la empresa
            type: sequelize.STRING(50),
            allowNull: false,
            unique:{
                args: true,
                msg: "Ya existe un email con este nombre"
            }
        },
        password:{
            type: sequelize.STRING(250),
            allowNull: false,
        },
        rol:{
            type: sequelize.ENUM('admin','cajero'),//rol del usuario, decide nivel de acceso al sistema
            allowNull: false,
            defaultValue: 'cajero'
        },
        pin:{
            type:sequelize.STRING(6),
            allowNull: true,
            defaultValue: '000000'
        }
    },
    {
        tablename: "usuarios"
    }
);

module.exports = Usuario;