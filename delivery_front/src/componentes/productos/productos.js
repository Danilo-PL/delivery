import React, { useState, useEffect } from "react";
import axios from "axios";
import "./producto.css";
import { mostrarAlerta } from "../alerts/Alert";

const GProducto = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [productos, setProductos] = useState([]);

  // Realizamos la petición para obtener los productos cuando el componente se monta
  useEffect(() => {
    fetchProductos();
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  const fetchProductos = async () => {
    try {
      // Realizamos la solicitud GET para obtener los productos
      const response = await axios.get("http://localhost:3001/api/productos/listar");
      console.log(response.data); // Para verificar la respuesta
      setProductos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      mostrarAlerta("No se pudo cargar la lista de productos.", "error");
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    const precioFloat = parseFloat(precio);
    const stockInt = parseInt(stock, 10);

    if (!nombre || isNaN(precioFloat) || isNaN(stockInt) || precioFloat <= 0 || stockInt < 0) {
      mostrarAlerta("Por favor, completa todos los campos correctamente.", "warning");
      return;
    }

    try {
      if (id) {
        // Actualizar producto existente
        await axios.put(`http://localhost:3001/api/productos/editar?id=${id}`, {
          nombre,
          descripcion: descripcion || null,
          precio: precioFloat,
          stock: stockInt,
        });
        mostrarAlerta("Producto actualizado exitosamente.", "success");
      } else {
        // Guardar un nuevo producto
        await axios.post("http://localhost:3001/api/productos/guardar", {
          nombre,
          descripcion: descripcion || null,
          precio: precioFloat,
          stock: stockInt,
        });
        mostrarAlerta("Producto guardado exitosamente.", "success");
      }

      limpiarFormulario();
      fetchProductos(); // Refrescar la lista de productos después de guardar/editar
    } catch (error) {
      console.error("Error al guardar/editar el producto:", error);
      mostrarAlerta(
        error.response?.data?.error || "Error en la conexión con el servidor.",
        "error"
      );
    }
  };

  const limpiarFormulario = () => {
    setId("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
  };

  const handleEditar = (producto) => {
    setId(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setStock(producto.stock);
  };

  return (
    <div className="product-box">
      <div className="product-header">
        <h1>Gestión de Productos</h1>
        <p className="product-box-msg">Completa los campos para guardar o editar un producto</p>
      </div>

      <div className="product-container">
        <form className="product-form" onSubmit={handleGuardar}>
          <div className="input-group">
            <input
              name="id"
              type="text"
              className="form-control"
              placeholder="ID del Producto (dejar vacío para agregar nuevo)"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
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
              placeholder="Descripción (opcional)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              name="precio"
              type="number"
              className="form-control"
              placeholder="Precio (ejemplo: 10.99)"
              min="0.01"
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
            {id ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>

      <div className="product-table">
        <h2>Listado de Productos</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditar(producto)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GProducto;