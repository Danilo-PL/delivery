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


import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ActualizarContrasena from "../paginas/Login/ActualizarContrasena";
import EnviarPin from "../paginas/Login/EnviarPin";
import RegistroCliente from "../paginas/Login/RegistroCliente";
import PageHome from "../componentes/plantilla/PageHome";
import PageHomeClientes from "../paginas/clientes/PageHomeClientes";
import Login from "../paginas/Login/Login";
import { AutenticacionRoute } from "./AutenticacionRoute";
import { ClienteLayout } from "./ClienteLayout";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-pin" element={<EnviarPin />} />
            <Route path="/actualizar-contrasena" element={<ActualizarContrasena />} />
            <Route path="/registro-cliente" element={<RegistroCliente />} />
            <Route path="/app" element={<AutenticacionRoute />}>
                <Route path="clientes" element={<ClienteLayout />}>
                    <Route path="" element={<PageHomeClientes />} />
                </Route>
            </Route>
            <Route path="home" element={<PageHome />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Route>
    ),
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        }
    }
);


import { useState } from "react";
import { DesEncriptar, Encriptar } from "../../componentes/encryptar/Crypto";

export const useSessionStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = DesEncriptar(window.sessionStorage.getItem(keyName));
            if (value) {
                return JSON.parse(value);
            } else {
                window.sessionStorage.setItem(keyName, Encriptar(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.sessionStorage.setItem(keyName, Encriptar(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};



import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};


import React, { useEffect, useReducer, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { useSessionStorage } from "../storage/useSessionStorage";

const UsuarioState = (props) => {
    const [usuario, setUsuario] = useSessionStorage("usuario_almacenado", null);
    const [token, setToken] = useSessionStorage("token_almacenado", null);

    const setCerrarSesion = () => {
        setUsuario(null);
        setToken(null);
    };

    const setLogin = async (data) => {
        try {
            setUsuario(data.usuario);
            setToken(data.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UsuarioContext.Provider value={{
            usuario: usuario,
            token: token,
            setLogin,
            setCerrarSesion,
        }}>
            {props.children}
        </UsuarioContext.Provider>
    );
};

export default UsuarioState;


import { createContext, useContext } from "react";
export const UsuarioContext = createContext();

export const useContextUsuario = () => {
    return useContext(UsuarioContext);
};
