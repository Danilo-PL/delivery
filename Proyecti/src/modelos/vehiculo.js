const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Vehiculo = db.define(
    "vehiculo",
    {
        vehiculo_tipo: {
            type: sequelize.ENUM('moto','carro','bicicleta'),
            allowNull: false,
            defaultValue: 'moto'
        },
        vehiculo_placa: {
            type: sequelize.STRING(8), 
            allowNull: false,
        }, 
        vehiculo_marca: {//tiene que estar fuera de descripcion para filtrar datos de mejor manera
            type: sequelize.STRING(15), 
            allowNull: true,
        },
        vehiculo_descripcion: {
            type: sequelize.TEXT, 
            allowNull: false,
        }
    },
    {
        tablename: "vehiculos"
    }
);

module.exports = Vehiculo;
