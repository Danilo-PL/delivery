const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEntrega = require('../controladores/controladorEntrega');
const ModeloEntrega = require('../modelos/entrega');
const rutas = Router();

rutas.get('/', controladorEntrega.inicio); 

/**
 * @swagger
 * /entregas/listar:
 *   get:
 *     summary: Obtiene la lista de entregas
 *     tags: [Entregas]
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único de la entrega
 *                   ruta:
 *                     type: string
 *                     description: Ruta de entrega
 *                   hora_salida:
 *                     type: string
 *                     format: date-time
 *                     description: Hora de salida de la entrega
 *                   estado:
 *                     type: string
 *                     enum: [procesando, entregado]
 *                     description: Estado de la entrega
 *       404:
 *         description: No se encontraron entregas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay entregas
 */
rutas.get('/listar', controladorEntrega.listar);

/**
 * @swagger
 * /entregas/guardar:
 *   post:
 *     summary: Guarda una nueva entrega
 *     tags: [Entregas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruta:
 *                 type: string
 *                 description: Ruta de entrega (no puede estar en blanco)
 *               hora_salida:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de salida de la entrega
 *               estado:
 *                 type: string
 *                 enum: [procesando, entregado]
 *                 description: Estado de la entrega
 *     responses:
 *       201:
 *         description: Entrega guardada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la entrega
 *                 ruta:
 *                   type: string
 *                   description: Ruta de la entrega
 *                 hora_salida:
 *                   type: string
 *                   format: date-time
 *                   description: Hora de salida de la entrega
 *                 estado:
 *                   type: string
 *                   enum: [procesando, entregado]
 *                   description: Estado de la entrega
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       409:
 *         description: Conflicto - El estado de la entrega ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error sobre el conflicto
 */
rutas.post('/guardar',
    body("estado").isLength({ min: 3, max: 15 }).withMessage('El estado no se ha especificado')
    .custom(async value => {
        if (!value) {
            throw new Error('El estado no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEntrega.findOne({ where: { nombre: value } });
            if (buscarCargo) {
                throw new Error('El estado del cargo ya existe');
            }
        }
    }),body("ruta").isLength({ min: 3 }).withMessage('la ruta no se ha especificado')
    .custom(async value => {
        if (!value) {
            throw new Error('El estado no permite valores nulos');
        }
    }),
    controladorEntrega.guardar);

/**
 * @swagger
 * /entregas/editar:
 *   put:
 *     summary: Edita una entrega existente
 *     tags: [Entregas]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entrega a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruta:
 *                 type: string
 *                 description: Nueva ruta de la entrega (opcional)
 *               hora_salida:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva hora de salida de la entrega (opcional)
 *               estado:
 *                 type: string
 *                 enum: [procesando, entregado]
 *                 description: Nuevo estado de la entrega
 *     responses:
 *       200:
 *         description: Entrega editada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la entrega editada
 *                 ruta:
 *                   type: string
 *                   description: Ruta actualizada de la entrega
 *                 hora_salida:
 *                   type: string
 *                   format: date-time
 *                   description: Hora de salida actualizada de la entrega
 *                 estado:
 *                   type: string
 *                   enum: [procesando, entregado]
 *                   description: Estado actualizado de la entrega
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       404:
 *         description: No se encontró la entrega con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El ID no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEntrega.findOne({ where: { id: value } });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),body("estado").isLength({ min: 3, max: 15 }).withMessage('El estado no se ha especificado')
    .custom(async value => {
        if (!value) {
            throw new Error('El estado no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEntrega.findOne({ where: { nombre: value } });
            if (buscarCargo) {
                throw new Error('El estado del cargo ya existe');
            }
        }
    }),body("ruta").isLength({ min: 3}).withMessage('la ruta no se ha especificado')
    .custom(async value => {
        if (!value) {
            throw new Error('El estado no permite valores nulos');
        }
    }), 
    controladorEntrega.editar);

/**
 * @swagger
 * /entregas/eliminar:
 *   delete:
 *     summary: Elimina una entrega existente
 *     tags: [Entregas]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entrega a eliminar
 *     responses:
 *       200:
 *         description: Entrega eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de eliminación
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       404:
 *         description: No se encontró la entrega con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El ID no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEntrega.findOne({ where: { id: value } });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorEntrega.eliminar);

module.exports = rutas;
