const sequelize = require('sequelize');
const db = new sequelize(
    process.env.DB_NAME,//nombre de la base de datos
    process.env.USER, //usuario
    process.env.PASSWORD, //contrasena
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
);

module.exports = db;
