const Repartidor = require('../modelos/repartidor.js');
const { enviar, errores } = require('../configuracion/ayuda');
const { validationResult } = require('express-validator');

exports.crearRepartidor = async (req, res) => {
    try {
        const nuevoRepartidor = await Repartidor.create(req.body);
        res.status(201).json(nuevoRepartidor);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el repartidor" });
    }
};

exports.obtenerRepartidores = async (req, res) => {
    try {
        const repartidores = await Repartidor.findAll();
        res.status(200).json(repartidores);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los repartidores" });
    }
};

exports.actualizarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidor.findByPk(req.params.id);
        if (!repartidor) {
            return res.status(404).json({ error: "Repartidor no encontrado" });
        }
        await repartidor.update(req.body);
        res.status(200).json(repartidor);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el repartidor" });
    }
};

exports.eliminarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidor.findByPk(req.params.id);
        if (!repartidor) {
            return res.status(404).json({ error: "Repartidor no encontrado" });
        }
        await repartidor.destroy();
        res.status(200).json({ mensaje: "Repartidor eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el repartidor" });
    }
};
