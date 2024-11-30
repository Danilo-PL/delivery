import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; //Crear este archivo para los estilos

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://njl2pr6d-3001.use.devtunnels.ms/api/usuarios/login', { email: username, password: password });
            console.log('Login response:', response.data.data);
        } catch (error) {
            console.error('Error login in:', error);
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



