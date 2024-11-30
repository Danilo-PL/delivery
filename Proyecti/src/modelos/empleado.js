const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Empleado = db.define(
    "empleado",
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
        correo:{//personal o para contactar
            type: sequelize.STRING(50),
            allowNull: true,
        },
        salario:{
            type: sequelize.DOUBLE,
            allowNull: true,
        },
        cargo:{
            type: sequelize.ENUM('admin','repartidor','cajero'),//rol en la empresa
            allowNull: false,
            defaultValue: 'cajero'
        }
        
    },
    {
        tablename: "empleados"
    }
);

module.exports = Empleado;
