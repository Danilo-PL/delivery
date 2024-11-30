import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './login.css'; //Crear este archivo para los estilos
import {mostrarAlerta} from '../alerts/Alert';
import {useContextUsuario} from '../../contexto/usuario/UsuarioContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setLogin, setCerrarSesion} = useContextUsuario();

    useEffect(()=>{
        setCerrarSesion();
    }, [setCerrarSesion]);
    
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            if(username === "" || password === ""){
                mostrarAlerta("Complete los Campos", "warning");
                return;
            }
            await axios.post('https://njl2pr6d-3001.use.devtunnels.ms/api/usuarios/login',{
                email: username,
                password: password,
            })
            .then(async (data)=>{
                const json = data.data;
                console.log(data.data);
                try{
                    var usuario = json.Usuario;
                    var token = json.Token;
                    
                    mostrarAlerta(
                        "Bienvenido(a) " + usuario.email,
                        "success"
                    );
                    await setLogin({usuario:usuario, token:token});
                    console.log(token);
                    navigate("/app/home");
                }catch(error){
                    console.error(error);
                }
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
            mostrarAlerta("Error en la paticion", "error");
        }
    };
    return (
        <div className='login-box'>
            <div className='login-logo'>
                <a href='/'>Delivery</a>
            </div>
            <div className='card card_ouline card-primary'>
                <div className='card-body login-card-body'>
                    <p className='login-box-msg'>Inicio de Sesion</p>
                    <form onSubmit={handleLogin}>
                        <div className='input-group mb-3'>
                            <input
                                type="text"
                                className='from-control'
                                placeholder='Nombre de Usuario o correo'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className='input-group-append'>
                                <div className='input-group-ext'>
                                    <span className='fas fa-envelope'></span>
                                </div>
                            </div>
                        </div>
                        <div className='input-group'>
                            <input
                                type="password"
                                className='from-control'
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <div className='input-group-append'>
                                <div className='input-group-ext'>
                                    <span className='fas fa-envelope'></span>
                                </div>
                            </div>
                            <span className="input-icon">🔒</span>
                            <div className='button-container'>
                                <button type='submit'>Sing in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;



