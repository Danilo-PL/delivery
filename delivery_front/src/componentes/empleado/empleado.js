import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mostrarAlerta } from '../alerts/Alert';
import './empleados.css';

const GuardarEmpleado = () => {
    const [id, setId] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [salario, setSalario] = useState('');
    const [cargo, setCargo] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Cargar los empleados al cargar el componente
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/empleados/listar');
                setEmpleados(response.data);
            } catch (error) {
                console.error('Error al cargar los empleados:', error);
                mostrarAlerta('Error al cargar los empleados', 'error');
            }
        };

        fetchEmpleados();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!identidad || !nombre || !telefono || !correo || !salario || !cargo) {
                mostrarAlerta('Complete todos los campos', 'warning');
                return;
            }

            if (id) {
                // Actualizar el registro si el id está presente
                await axios.put(`http://localhost:3001/api/empleados/editar?id=${id}`, {
                    identidad,
                    nombre,
                    telefono,
                    correo,
                    salario,
                    cargo,
                });
                mostrarAlerta('Empleado actualizado correctamente', 'success');
            } else {
                // Guardar un nuevo empleado si el id no está presente
                const response = await axios.post('http://localhost:3001/api/empleados/guardar', {
                    identidad,
                    nombre,
                    telefono,
                    correo,
                    salario,
                    cargo,
                });
                setEmpleados([...empleados, response.data]);
                mostrarAlerta('Empleado guardado correctamente', 'success');
            }

            // Limpiar los inputs después de guardar o actualizar
            setId('');
            setIdentidad('');
            setNombre('');
            setTelefono('');
            setCorreo('');
            setSalario('');
            setCargo('');
        } catch (error) {
            console.log('Error:', error);
            mostrarAlerta('Error en la petición', 'error');
        }
    };

    return (
        <div className="update-box">
            <div className="update-logo">
                <a>Registrar Empleado</a>
            </div>
            <p className="update-box-msg">Completa los campos para guardar o editar los datos del empleado</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Id (Dejar vacío para agregar uno nuevo)"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
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
                <button type="submit">Enviar Datos</button>
            </form>
        </div>
    );
};

export default GuardarEmpleado;
