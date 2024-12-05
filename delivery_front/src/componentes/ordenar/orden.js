import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mostrarAlerta } from '../alerts/Alert'; // Asegúrate de tener esta función para mostrar alertas
import './ordenar.css';

const RegistrarVenta = () => {
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [isv, setIsv] = useState(0.15); // ISV, 15% por defecto
    const [descuento, setDescuento] = useState(0); // Descuento
    const [subtotal, setSubtotal] = useState(0); // Subtotal
    const [isvTotal, setIsvTotal] = useState(0); // ISV total
    const [empleadoId, setIdEmpleado] = useState(''); // ID del empleado
    const [fecha, setFechaActual] = useState(new Date().toISOString().slice(0, 10)); // Fecha actual

    // Función para calcular el subtotal e ISV
    useEffect(() => {
        if (cantidad && precio) {
            const subtotalCalc = parseInt(cantidad) * parseFloat(precio);
            setSubtotal(subtotalCalc);
            const isvCalc = subtotalCalc * parseFloat(isv);
            setIsvTotal(isvCalc);
        }
    }, [cantidad, precio, isv]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productoId || !cantidad || !precio || !empleadoId) {
                mostrarAlerta('Complete todos los campos', 'warning');
                return;
            }
    
            const cantidadInt = parseInt(cantidad);
            const precioFloat = parseFloat(precio);
            const descuentoFloat = parseFloat(descuento);
            const subtotalFinal = parseFloat(subtotal);
            const total = subtotalFinal - descuentoFloat + isvTotal;
    
            // Registrar la venta en la tabla "venta"
            const ventaResponse = await axios.post('http://localhost:3001/api/ventas/guardar', {
                fecha: fecha,
                total: total,
                empleadoId: empleadoId,
            });
    
            if (ventaResponse.status === 200) {
                const idVenta = ventaResponse.data.id_venta; // ID de la venta creada
    
                // Registrar los detalles en la tabla "venta_detalles"
                const detallesResponse = await axios.post('http://localhost:3001/api/venta_detalles/guardar', {
                    id_venta: idVenta, // Relación con la venta principal
                    productoId: productoId,
                    cantidad: cantidadInt,
                    precio_unitario: precioFloat,
                    isv: isvTotal,
                    descuento: descuentoFloat,
                    subtotal: subtotalFinal,
                });
    
                if (detallesResponse.status === 200) {
                    // Mostrar alerta de éxito
                    mostrarAlerta('Venta registrada correctamente', 'success');
                    
                    // Limpiar los campos del formulario
                    setProductoId('');
                    setCantidad('');
                    setPrecio('');
                    setDescuento(0);
                    setIdEmpleado('');
                    setSubtotal(0);
                    setIsvTotal(0); // Reset ISV total
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            mostrarAlerta('Error al registrar la venta', 'error');
        }
    };
    

    return (
        <div className="venta-box">
            <div className="venta-header">
                <h1>Registrar Venta</h1>
                <p className="venta-box-msg">Complete los campos para registrar una venta</p>
            </div>

            <form onSubmit={handleSubmit} className="venta-form">
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID Producto"
                        value={productoId}
                        onChange={(e) => setProductoId(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Descuento"
                        value={descuento}
                        onChange={(e) => setDescuento(Number(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID Empleado"
                        value={empleadoId}
                        onChange={(e) => setIdEmpleado(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Subtotal: Lps {subtotal.toFixed(2)}</label>
                </div>
                <div className="input-group">
                    <label>ISV: Lps {isvTotal.toFixed(2)}</label>
                </div>
                <div className="input-group">
                    <label>Total: Lps {(subtotal - descuento + isvTotal).toFixed(2)}</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Ordenar
                </button>
            </form>
        </div>
    );
};

export default RegistrarVenta;
