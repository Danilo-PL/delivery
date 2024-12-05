const sequelize = require("sequelize");
const db = require("../configuracion/db");

const Producto = db.define(
  "producto",
  {
    nombre: {
      type: sequelize.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "Ya existe un producto con este nombre",
      },
    },
    descripcion: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    precio: {
      type: sequelize.FLOAT, // Cambiado a FLOAT para soportar decimales
      allowNull: true,
    },
    stock: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "productos",
    timestamps: false, // Si no usas createdAt y updatedAt
  }
);

module.exports = Producto;
