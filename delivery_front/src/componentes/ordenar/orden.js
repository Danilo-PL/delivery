import React, { useState } from 'react';
import axios from "axios";
import { mostrarAlerta } from "../alerts/Alert";

const RegistrarVenta = () => {
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [isv, setIsv] = useState(0.15);  // ISV (ejemplo: 15%)
  const [descuento, setDescuento] = useState(0); // Descuento en porcentaje
  const [productoId, setProductoId] = useState("");
  const [productoInfo, setProductoInfo] = useState(null); // Detalles del producto buscado
  const [total, setTotal] = useState(0);  // Total de la venta
  const [totalImpuesto, setTotalImpuesto] = useState(0);  // Total del ISV

  const buscarProducto = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/productos/buscar?=${id}`);
      setProductoInfo(response.data);
      setPrecioUnitario(response.data.precio_unitario); // Mostrar el precio en el input
      mostrarAlerta("Producto encontrado.", "success");
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      mostrarAlerta("Producto no encontrado.", "warning");
      setProductoInfo(null);
      setPrecioUnitario(""); // Limpiar el precio si no se encuentra el producto
    }
  };

  const handleRegistrarVenta = async (e) => {
    e.preventDefault();

    const cantidadInt = parseInt(cantidad, 10);
    const precioFloat = parseFloat(precioUnitario);
    const descuentoFloat = parseFloat(descuento);

    if (isNaN(cantidadInt) || cantidadInt <= 0 || isNaN(precioFloat) || precioFloat <= 0) {
      mostrarAlerta("Por favor, ingresa una cantidad y precio válidos.", "warning");
      return;
    }

    const subtotal = cantidadInt * precioFloat;
    const impuesto = subtotal * isv;
    const totalConDescuento = subtotal + impuesto - (subtotal * descuentoFloat / 100);

    setTotal(totalConDescuento);
    setTotalImpuesto(impuesto);

    try {
      const response = await axios.post("http://localhost:3001/api/venta_detalles/guardar", {
        cantidad: cantidadInt,
        precio_unitario: precioFloat,
        isv: isv,
        descuento: descuentoFloat / 100,
        productoId,
        fecha: new Date(),
        total: totalConDescuento,
      });

      mostrarAlerta("Venta registrada exitosamente.", "success");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      mostrarAlerta("Error al registrar la venta.", "error");
    }
  };

  const handleProductoIdChange = (e) => {
    const id = e.target.value;
    setProductoId(id);
    if (id) {
      buscarProducto(id); // Buscar el producto cuando se ingresa un ID
    } else {
      setProductoInfo(null); // Limpiar información si se borra el ID
      setPrecioUnitario(""); // Limpiar precio si se borra el ID
    }
  };

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
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Producto Id"
            value={productoId}
            onChange={handleProductoIdChange}
            required
          />
        </div>
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
            disabled // El campo es solo lectura cuando se encuentra el producto
          />
        </div>
        {productoInfo && (
          <div className="producto-nombre">
            {productoInfo.nombre}
          </div>
        )}
        {total > 0 && mostrarTotalVenta(total, totalImpuesto)}
        <button type="submit" className="btn btn-primary">
          Ordenar
        </button>
      </form>
    </div>
  );
};

export default RegistrarVenta;
