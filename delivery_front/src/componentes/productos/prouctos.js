import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mostrarAlerta } from "../alerts/Alert";


const GProducto = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar producto
  const handleGuardar = () => {
    const { nombre, descripcion, precio, stock } = formData;

    if (!nombre || !descripcion || isNaN(precio) || isNaN(stock)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    setProductos([
      ...productos,
      { nombre, descripcion, precio: parseFloat(precio), stock: parseInt(stock, 10) },
    ]);
    setFormData({ nombre: "", descripcion: "", precio: "", stock: "" });
  };

  // Eliminar producto
  const handleEliminar = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  // Editar producto
  const handleEditar = (index) => {
    const producto = productos[index];
    setFormData(producto);
    handleEliminar(index);
  };

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter((producto) =>
    Object.values(producto)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleproducto = async (e) =>{
    e.preventDefault();
    try{
        await axios.post('http://localhost:3001/api/productos/guardar',{
            
        })
        .then(async (data)=>{
            const json = data.data;
            console.log(data.data);
            
        })
        .catch((error) =>{
            console.log(error);
            if(Array.isArray(error.response.data)){
                error.response.data.msj.forEach((f)=>{
                    mostrarAlerta("Campo:"+ f.msj,"warning");
                });
            }else{
                mostrarAlerta(error.response.data.error, "warning");
            }
        });
    }catch(error){
        console.log("Error:", error);
        mostrarAlerta("Error en la peticion", "error");
    }
};
  return (
    <main className="main">
      <section className="products section">
        <h1 className="text-center p-3">Gestión de Productos</h1>
        <div className="container-fluid row">
          {/* Formulario de registro */}
          <form className="col-4 p-5" onSubmit={handleproducto}>
            <h1 className="text-center text-secondary">Registro</h1>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                rows="3"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                name="precio"
                type="number"
                className="form-control"
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                name="stock"
                type="number"
                className="form-control"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGuardar}
              >
                Guardar
              </button>
            </div>
          </form>

          {/* Tabla de productos */}
          <div className="col-8 p-5">
            <div className="col-8 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <table className="table">
              <thead className="bg-info">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio.toFixed(2)}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditar(index)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GProducto;
