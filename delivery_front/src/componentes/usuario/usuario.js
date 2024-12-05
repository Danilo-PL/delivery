import React, { useState } from 'react';
import axios from 'axios';
import './usuarios.css'; // Asegúrate de crear este archivo con los estilos
import { mostrarAlerta } from '../alerts/Alert';

const GuardarUsuario = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validación para asegurarse de que todos los campos estén completos
            if (!email || !password || !rol) {
                mostrarAlerta('Complete todos los campos', 'warning');
                return;
            }

            // Enviar los datos del nuevo usuario al servidor
            await axios.post('http://localhost:3001/api/usuarios/guardar', {
                email,
                password,
                rol
            });

            // Mostrar alerta de éxito
            mostrarAlerta('Usuario Guardado correctamente', 'success');

            // Limpiar los inputs después de guardar
            setEmail('');
            setPassword('');
            setRol('');
        } catch (error) {
            console.log('Error:', error);
            mostrarAlerta('Error en la petición', 'error');
        }
    };

    return (
        <div className="update-box">
            <div className="update-logo">
                <a>Guardar Datos del Usuario</a>
            </div>
            <p className="update-box-msg">Completa los campos para guardar los datos del usuario</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar Datos</button>
            </form>
        </div>
    );
};

export default GuardarUsuario;
