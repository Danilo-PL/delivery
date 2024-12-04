import React, { useState, useEffect } from "react";
import axios from "axios";
import "./producto.css";
import { mostrarAlerta } from "../alerts/Alert";

const GProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Cargar productos al inicio
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/productos");
        console.log(response.data); // Verifica el contenido de la respuesta
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        mostrarAlerta("No se pudo cargar la lista de productos.", "error");
      }
    };
    

    fetchProductos();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();

    // Validar los campos
    const precioFloat = parseFloat(precio);
    const stockInt = parseInt(stock, 10);

    if (!nombre || isNaN(precioFloat) || isNaN(stockInt) || precioFloat <= 0 || stockInt < 0) {
      mostrarAlerta("Por favor, completa todos los campos correctamente.", "warning");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/productos/guardar", {
        nombre,
        descripcion: descripcion || null,
        precio: precioFloat,
        stock: stockInt,
      });
    
      console.log(response.data); // Verifica lo que recibes
      mostrarAlerta("Producto guardado exitosamente.", "success");
    
    
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

  return (
    <div className="product-box">
      <div className="product-header">
        <h1>Registro de Productos</h1>
        <p className="product-box-msg">Completa los campos para registrar un producto</p>
      </div>

      <div className="product-container" style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Formulario de registro */}
        <form className="product-form" onSubmit={handleGuardar} style={{ flex: "1", marginRight: "20px" }}>
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
            Guardar
          </button>
        </form>

        
        </div>
      </div>
  );
};

export default GProducto;
