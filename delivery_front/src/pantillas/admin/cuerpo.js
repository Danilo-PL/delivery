import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cuerpo = () => {

  return (
    <header id="home" class="header">
      
        <div class="overlay text-white text-center">
            <h1 class="display-2 font-weight-bold my-3">Delivery</h1>
            <h2 class="display-4 mb-5">ordenes y &amp; pedidos</h2>
            <a class="btn btn-primary ml-xl-4" href="productos">Registar producto</a>
            <a class="btn btn-primary ml-xl-4" href="empleados">Registar empleado</a>
            <a class="btn btn-primary ml-xl-4" href="usuarios">Registar usuarios</a>
        </div>
    </header>
  );
};

export default Cuerpo;
