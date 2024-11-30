

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