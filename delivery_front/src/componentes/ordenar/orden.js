import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mostrarAlerta } from '../alerts/Alert'; // Asegúrate de tener esta función para mostrar alertas

const RegistrarVenta = () => {
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [isv, setIsv] = useState(0.15); // ISV, 15% por defecto
    const [descuento, setDescuento] = useState(0); // Descuento
    const [subtotal, setSubtotal] = useState(0); // Subtotal
    const [isvTotal, setIsvTotal] = useState(0); // ISV total

    // Función para calcular el subtotal e ISV
    useEffect(() => {
        if (cantidad && precio) {
            const subtotalCalc = cantidad * precio;
            setSubtotal(subtotalCalc);
            const isvCalc = subtotalCalc * isv;
            setIsvTotal(isvCalc);
        }
    }, [cantidad, precio, isv]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productoId || !cantidad || !precio) {
                mostrarAlerta('Complete todos los campos', 'warning');
                return;
            }

            const total = subtotal - descuento + isvTotal;

            // Enviar los datos de la venta al backend
            const response = await axios.post('http://localhost:3001/api/venta_detalles/guardar', {
                productoId: productoId,
                cantidad: cantidad,
                precio: precio,
                isvTotal: isvTotal,
                descuento: descuento,
                subtotal: subtotal - descuento + isvTotal, // Se descuenta el descuento y se agrega el ISV
                total: total
            });

            if (response.status === 200) {
                mostrarAlerta('Venta registrada correctamente', 'success');
            }

            // Limpiar los inputs después de enviar el formulario
            setProductoId('');
            setCantidad('');
            setPrecio('');
            setDescuento(0);
        } catch (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
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
                    <label>Subtotal: ${subtotal}</label>
                </div>
                <div className="input-group">
                    <label>ISV: ${isvTotal}</label>
                </div>
                <div className="input-group">
                    <label>Total: ${(subtotal - descuento + isvTotal).toFixed(2)}</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrar Venta
                </button>
            </form>
        </div>
    );
};

export default RegistrarVenta;
