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

    // Cargar empleados cuando el componente se monte
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/empleados/listar');
                setEmpleados(response.data);
            } catch (error) {
                console.log('Error al cargar empleados:', error);
                mostrarAlerta('Error al cargar la lista de empleados', 'error');
            }
        };

        fetchEmpleados();
    }, []);  // El arreglo vacío asegura que solo se ejecute una vez cuando se monte el componente

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

            // Recargar empleados después de guardar o actualizar
            const response = await axios.get('http://localhost:3001/api/empleados/listar');
            setEmpleados(response.data);

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
        <div className="product-box">
            <div className="product-header">
                <h1>Gestión de Empleados</h1>
                <p className="product-box-msg">Completa los campos para guardar o editar los datos de un empleado</p>
            </div>

            <div className="product-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Formulario de registro */}
                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                    style={{ flex: '1', marginRight: '20px' }}
                >
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
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Salario"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Enviar datos
                    </button>
                </form>

                <div className="product-table">
                    <div className="product-table" style={{ flex: '2' }}>
                        <h3>Lista de Empleados</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Identidad</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Correo</th>
                                    <th>Salario</th>
                                    <th>Cargo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.length > 0 ? (
                                    empleados.map((empleado) => (
                                        <tr key={empleado.id}>
                                            <td>{empleado.id}</td>
                                            <td>{empleado.identidad}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.telefono}</td>
                                            <td>{empleado.correo}</td>
                                            <td>{empleado.salario}</td>
                                            <td>{empleado.cargo}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No hay empleados registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuardarEmpleado;
