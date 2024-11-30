import {Navigate, Outlet } from "react-router-dom";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import { mostraAlertaError } from "../componentes/alerts/Alert";

export const AutenticacionRoute = ({ children }) =>{
    const {token, email} = useContextUsuario();
    console.log (email);
    console.log (token);
    if (!token){
        mostraAlertaError("Debes validar tus credenciales nuevamente");
        return <Navigate to="/login" />;
    }
    return <Outlet></Outlet>;
};