import {navigate, oulet } from "react-router-dom";
import { useContextUsuario } from "../Contexto/usuario/UsuarioContext";
import { mostraAlertaError } from "../componentes/alerts/sweetAlert";

export const autenticacionRoute = ({ children }) =>{
    const {token, usario} = usecontextUsuario();
    if (!token){
        mostraAlertaError("Debes validar tus credenciales nuevamente");
        return <navigate to="/login" />;
    }
    return <oulet></oulet>;
};