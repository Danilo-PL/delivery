import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './actualizar.css'; // Asegúrate de crear este archivo con los estilos
import { mostrarAlerta } from '../alerts/Alert';
import { useNavigate } from 'react-router-dom';

const GuardarEmpleado = () => {
    const [identidad, setIdentidad] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [salario, setSalario] = useState('');
    const [cargo, setCargo] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!identidad || !nombre || !telefono || !correo || !salario || !cargo) {
                mostrarAlerta('Complete todos los campos', 'warning');
                return;
            }

            // Aquí puedes agregar la URL de tu API que maneje la creación de un empleado
            await axios.post('http://localhost:3001/api/empleados/guardar', {
                identidad,
                nombre,
                telefono,
                correo,
                salario,
                cargo
            });

            mostrarAlerta('Empleado Guardado correctamente', 'success');
            navigate('/empleados'); // O la ruta que prefieras

        } catch (error) {
            console.log('Error:', error);
            mostrarAlerta('Error en la petición', 'error');
        }
    };

    return (
        <div className="update-box">
            <div className="update-logo">
                <a href="/">Guardar Datos del Empleado</a>
            </div>
            <p className="update-box-msg">Completa los campos para actualizar los datos del empleado</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Identidad"
                        value={identidad}
                        onChange={(e) => setIdentidad(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Salario"
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar Datos</button>
            </form>
            
        
        </div>
    );
};

export default GuardarEmpleado;
