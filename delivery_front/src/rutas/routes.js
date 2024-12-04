import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PageHome from "../paginas/PageHome";
import PageHome2 from "../paginas/PageHome2";
import Login from "../componentes/login/login";
import Recuperar from "../componentes/Recuperar/recuperar";
import Actualizar from "../componentes/actualizar/actualizar";
import Productos from "../componentes/productos/productos";
import Empleados from "../componentes/empleado/empleado"
import { AutenticacionRoute } from "./AutenticationRoute";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar" element={<Recuperar />} />
            <Route path="/actualizar" element={<Actualizar />} />
           
            <Route path="/app" element={<AutenticacionRoute />}>
              <Route path="admin" element={<PageHome />} />
              <Route path="productos" element={<Productos />} />
              <Route path="empleados" element={<Empleados />} />
            </Route>

            <Route path="/app" element={<AutenticacionRoute />}>
              <Route path="cajero" element={<PageHome2 />} />
            </Route>
      
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