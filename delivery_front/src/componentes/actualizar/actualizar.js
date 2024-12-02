import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './actualizar.css'; //Crear este archivo para los estilos
import {mostrarAlerta} from '../alerts/Alert';
import {useContextUsuario} from '../../contexto/usuario/UsuarioContext';
import { useNavigate } from 'react-router-dom';

const Actualizar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setpin] = useState('');
    const {setLogin, setCerrarSesion} = useContextUsuario();

    useEffect(()=>{
        setCerrarSesion();
    }, [setCerrarSesion]);
    
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            if(username === "" || password === "" || pin === ""){
                mostrarAlerta("Complete los Campos", "warning");
                return;
            }
            await axios.post('http://localhost:3001/api/usuarios/actualizar',{
                email: username,
                password: password,
                pin:pin
            }
        )
        navigate("/Login");
        }catch(error){
            console.log("Error:", error);
            mostrarAlerta("Error en la peticion", "error");
        }
    };
    return(
        <body>
  <div class="update-box">
    <div class="update-logo">
      <a href="/">Actualizar Contraseña</a>
    </div>
    <p class="update-box-msg">Completa los campos para actualizar tu contraseña</p>
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
      <div class="input-group">
      <input
        type="password"
        className='from-control'
        placeholder='Contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        />
      </div>
      <div class="input-group">
      <input
        type="Pin"
        className='from-control'
        placeholder='Pin'
        value={pin}
        onChange={(e) => setpin(e.target.value)}
        />
      </div>
      <button type="submit">Actualizar Contraseña</button>
    </form>
  </div>
</body>
    )
}

export default Actualizar;



