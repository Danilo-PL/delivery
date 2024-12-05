import React from 'react';
import { Link } from 'react-router-dom';

const Productos = () => {
  return (
    <div>
      <div id="gallary" className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
        <h2 className="section-title">NUESTRO MENU</h2>
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

