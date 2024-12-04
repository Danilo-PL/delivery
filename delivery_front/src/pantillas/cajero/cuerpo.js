import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cuerpo = () => {
  const navigate = useNavigate();
  const Productos = () =>{
    navigate("/productos")
  }
  return (
    <header id="home" class="header">
      
        <div class="overlay text-white text-center">
            <h1 class="display-2 font-weight-bold my-3">Delivery</h1>
            <h2 class="display-4 mb-5">ordenes y &amp; pedidos</h2>
            <button type='button' class="btn btn-lg btn-primary" onClick={Productos}>Registar producto</button>
        </div>
    </header>
  );
};

export default Cuerpo;
