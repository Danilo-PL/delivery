import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './recuperar.css'; //Crear este archivo para los estilos
import {mostrarAlerta} from '../alerts/Alert';
import {useContextUsuario} from '../../contexto/usuario/UsuarioContext';
import { useNavigate } from 'react-router-dom';

const Recuperar = () => {
    const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const {setLogin, setCerrarSesion} = useContextUsuario();

    useEffect(()=>{
        setCerrarSesion();
    }, [setCerrarSesion]);
    
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            if(username === ""){
                mostrarAlerta("Complete los Campos", "warning");
                return;
            }
            await axios.post('http://localhost:3001/api/usuarios/pin',{
                email: username
            })
            navigate("/Actualizar");
        }catch(error){
            console.log("Error:", error);
            mostrarAlerta("Error en la peticion", "error");
        }
    };
    return(
        <body>
  <div class="login-box">
    <div class="login-logo">
      <a className='login-box-msg'>Recuperar Contraseña</a>
    </div>
    <p class="login-box-msg">Ingresa tu correo electrónico para recuperar tu contraseña</p>
    <form onSubmit={handleLogin}>
      <div class="input-group">
        <input
          type="text"
          className='from-control'
          placeholder='Nombre de Usuario o correo'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button type="submit" >Recuperar Contraseña</button>
    </form>
  </div>
</body>
    )
}

export default Recuperar;



