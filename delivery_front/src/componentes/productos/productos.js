import React, { useState, useEffect } from "react";
import axios from "axios";
import { mostrarAlerta } from "../alerts/Alert";
import "./producto.css";

const GuardarProducto = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [productos, setProductos] = useState([]);

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/productos/listar");
        setProductos(response.data.datos || []); // Asignar un arreglo vacío si la respuesta no es válida
      } catch (error) {
        console.error("Error al cargar productos:", error);
        mostrarAlerta("Error al cargar la lista de productos", "error");
      }
    };

    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precioFloat = parseFloat(precio);
    const stockInt = parseInt(stock, 10);

    if (!nombre || isNaN(precioFloat) || isNaN(stockInt) || precioFloat <= 0 || stockInt < 0) {
      mostrarAlerta("Por favor, completa todos los campos correctamente", "warning");
      return;
    }

    try {
      if (id) {
        // Actualizar un producto existente
        await axios.put(`http://localhost:3001/api/productos/editar?id=${id}`, {
          nombre,
          descripcion: descripcion || null,
          precio: precioFloat,
          stock: stockInt,
        });
        mostrarAlerta("Producto actualizado exitosamente", "success");
      } else {
        // Crear un nuevo producto
        await axios.post("http://localhost:3001/api/productos/guardar", {
          nombre,
          descripcion: descripcion || null,
          precio: precioFloat,
          stock: stockInt,
        });
        mostrarAlerta("Producto guardado exitosamente", "success");
      }

      limpiarFormulario();
      // Recargar los productos después de guardar o actualizar
    } catch (error) {
      console.error("Error al guardar o actualizar el producto:", error);
      mostrarAlerta("Error en la conexión con el servidor", "error");
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
    setDescripcion(producto.descripcion || "");
    setPrecio(producto.precio);
    setStock(producto.stock);
  };

  return (
    <div className="product-box">
      <div className="product-header">
        <h1>Gestión de Productos</h1>
        <p>Completa los campos para guardar o editar un producto</p>
      </div>

      <div className="product-container" style={{ display: "flex", justifyContent: "space-between" }}>
        <form className="product-form" onSubmit={handleSubmit} style={{ flex: 1, marginRight: "20px" }}>
          <div className="input-group">
            <input
              type="text"
              placeholder="ID (Dejar vacío para nuevo)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={id !== ""}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del Producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Precio"
              min="0.01"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Stock"
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

        <div className="product-table" style={{ flex: 2 }}>
          <h3>Lista de Productos</h3>
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
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuardarProducto;
