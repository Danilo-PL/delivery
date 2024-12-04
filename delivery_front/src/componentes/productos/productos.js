import React, { useState,useEffect } from "react";
import axios from "axios";
import './producto.css';
import { mostrarAlerta } from "../alerts/Alert";

const GProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();

    // Validar los campos
    const precioDouble = parseFloat(precio);
    const stockInt = parseInt(stock, 10);

    if (!nombre || !descripcion || isNaN(precioDouble) || isNaN(stockInt) || precioDouble <= 0 || stockInt < 0) {
      mostrarAlerta("Por favor, completa todos los campos correctamente.", "warning");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/productos/guardar", {
        nombre,
        descripcion,
        precio: precioDouble,
        stock: stockInt,
      });

      mostrarAlerta("Producto guardado exitosamente.", "success");
      console.log("Respuesta del servidor:", response.data);

      // Actualizar lista local con valores validados
      setProductos([
        ...productos,
        { nombre, descripcion, precio: precioDouble, stock: stockInt },
      ]);

      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    } catch (error) {
      console.error("Error al guardar el producto:", error);

      if (error.response?.data?.error) {
        mostrarAlerta(error.response.data.error, "error");
      } else {
        mostrarAlerta("Error en la conexión con el servidor.", "error");
      }
    }
  };

  // Filtrar productos según búsqueda
  const productosFiltrados = productos.filter((producto) =>
    Object.values(producto)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-box">
  <div className="product-header">
    <h1>Gestión de Productos</h1>
    <p className="product-box-msg">Completa los campos para registrar un producto</p>
  </div>

  <div className="product-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* Formulario de registro */}
    <form className="product-form" onSubmit={handleGuardar} style={{ flex: '1', marginRight: '20px' }}>
      <div className="input-group">
        <input
          name="nombre"
          type="text"
          className="form-control"
          placeholder="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <textarea
          name="descripcion"
          className="form-control"
          rows="3"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          name="precio"
          type="number"
          className="form-control"
          placeholder="Precio (ejemplo: 10.99)"
          min="0"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          name="stock"
          type="number"
          className="form-control"
          placeholder="Stock (ejemplo: 10)"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>

    {/* Tabla de productos */}
    <div className="product-table-container" style={{ flex: '1', marginLeft: '20px' }}>
      <div className="product-search">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio.toFixed(2)}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default GProducto;
