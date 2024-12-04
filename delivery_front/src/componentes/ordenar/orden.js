import React, { useState, useEffect } from 'react';
import axios from "axios";
import { mostrarAlerta } from "../alerts/Alert";
//import './venta.css';

const RegistrarVenta = () => {
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [isv, setIsv] = useState(0.15);  // ISV (ejemplo: 15%)
  const [descuento, setDescuento] = useState(0); // Descuento en porcentaje
  const [productoId, setProductoId] = useState("");
  const [total, setTotal] = useState(0);  // Total de la venta
  const [totalImpuesto, setTotalImpuesto] = useState(0);  // Total del ISV

  const handleRegistrarVenta = async (e) => {
    e.preventDefault();

    // Validación de los campos
    const cantidadInt = parseInt(cantidad, 10);
    const precioFloat = parseFloat(precioUnitario);
    const descuentoFloat = parseFloat(descuento);

    if (isNaN(cantidadInt) || cantidadInt <= 0 || isNaN(precioFloat) || precioFloat <= 0) {
      mostrarAlerta("Por favor, ingresa una cantidad y precio válidos.", "warning");
      return;
    }

    // Calcular subtotal, ISV y total
    const subtotal = cantidadInt * precioFloat;
    const impuesto = subtotal * isv;  // Total del ISV
    const totalConDescuento = subtotal + impuesto - (subtotal * descuentoFloat / 100);  // Total con descuento

    // Establecer los valores del total y el impuesto
    setTotal(totalConDescuento);
    setTotalImpuesto(impuesto);

    try {
      const response = await axios.post("http://localhost:3001/api/venta_detalles/guardar", {
        cantidad: cantidadInt,
        precio_unitario: precioFloat,
        isv: isv,
        descuento: descuentoFloat / 100,  // Convertir a decimal
        productoId,
        fecha: new Date(),  // Enviar la fecha actual
        total: totalConDescuento,
      });

      mostrarAlerta("Venta registrada exitosamente.", "success");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      mostrarAlerta("Error al registrar la venta.", "error");
    }
  };

  // Mostrar total y total del impuesto
  const mostrarTotalVenta = (total, totalImpuesto) => (
    <div>
      <p>Total Impuesto (ISV): Lps{totalImpuesto.toFixed(2)}</p>
      <p>Total Venta: Lps{total.toFixed(2)}</p>
    </div>
  );

  return (
    <div className="venta-box">
      <div className="venta-header">
        <h1>Registrar Venta</h1>
      </div>

      <form onSubmit={handleRegistrarVenta} className="venta-form">
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
            placeholder="Precio Unitario"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Producto Id"
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            required
          />
        </div>
        {/* Mostrar los cálculos del total y el impuesto */}
      {total > 0 && mostrarTotalVenta(total, totalImpuesto)}
        <button type="submit" className="btn btn-primary">
          Ordenar
        </button>
      </form>

      
    </div>
  );
};

export default RegistrarVenta;
