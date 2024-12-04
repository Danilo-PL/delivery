import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cuerpo = () => {
  const navigate = useNavigate();
  const Productos = () =>{
    navigate("/productos")
  }
  return (
    <header id="home2" class="header">
      
        <div class="overlay text-white text-center">
            <h1 class="display-2 font-weight-bold my-3">Delivery</h1>
            <h2 class="display-4 mb-5">Ordenes y Pedidos</h2>
            <div class="container-fluid">
            <a class="btn btn-primary ml-xl-4" href="orden">Ordenar</a>
            </div>
        </div>
    </header>
  );
};

export default Cuerpo;
