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
        <h2 className="section-title"></h2>
      </div>
      <div className="gallary row">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
            <a href="#" className="gallary-overlay">
              <i className="gallary-icon ti-plus"></i>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
