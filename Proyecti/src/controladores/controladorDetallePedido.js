const DetallePedido = require('../modelos/detalle_pedido');
const { enviar, errores } = require('../configuracion/ayuda');
const { validationResult } = require('express-validator');

exports.crearDetallePedido = async (req, res) => {
    try {
        const nuevoDetalle = await DetallePedido.create(req.body);
        res.status(201).json(nuevoDetalle);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el detalle del pedido" });
    }
};

exports.obtenerDetallesPedido = async (req, res) => {
    try {
        const detalles = await DetallePedido.findAll();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los detalles del pedido" });
    }
};

exports.actualizarDetallePedido = async (req, res) => {
    try {
        const detalle = await DetallePedido.findByPk(req.params.id);
        if (!detalle) {
            return res.status(404).json({ error: "Detalle no encontrado" });
        }
        await detalle.update(req.body);
        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el detalle del pedido" });
    }
};

exports.eliminarDetallePedido = async (req, res) => {
    try {
        const detalle = await DetallePedido.findByPk(req.params.id);
        if (!detalle) {
            return res.status(404).json({ error: "Detalle no encontrado" });
        }
        await detalle.destroy();
        res.status(200).json({ mensaje: "Detalle eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el detalle del pedido" });
    }
};
