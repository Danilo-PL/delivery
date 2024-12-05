import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos/listar');
        console.log('Datos recibidos:', response.data);
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          console.error('Los datos recibidos no son un array:', response.data);
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <div id="gallary" className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
        <h2 className="section-title">NUESTRO MENÚ</h2>
      </div>
      <div className="container mt-4">
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.id} className="col-sm-6 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-primary font-weight-bold">
                    Lps {producto.precio.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;
