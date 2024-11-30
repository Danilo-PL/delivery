const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUbicacion = require('../controladores/controladorUbicacion');
const ModeloUbicacion = require('../modelos/ubicacion');
const rutas = Router();
rutas.get('/',controladorUbicacion.inicio);

/**
 * @swagger
 * /ubicaciones/listar:
 *   get:
 *     summary: Obtiene la lista de ubicaciones
 *     tags: [Ubicaciones]
 *     responses:
 *       200:
 *         description: Lista de ubicaciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único de la ubicación
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la ubicación
 *                   direccion:
 *                     type: string
 *                     description: Dirección de la ubicación
 *                   activo:
 *                     type: boolean
 *                     description: Indica si la ubicación está activa
 *       404:
 *         description: No se encontraron ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay ubicaciones
 */

rutas.get('/listar', controladorUbicacion.listar);

/**
 * @swagger
 * /ubicaciones/guardar:
 *   post:
 *     summary: Guarda una nueva ubicación
 *     tags: [Ubicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la ubicación (entre 3 y 50 caracteres, no puede estar en blanco)
 *               direccion:
 *                 type: string
 *                 description: Dirección de la ubicación
 *     responses:
 *       201:
 *         description: Ubicación guardada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la ubicación
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la ubicación
 *                 direccion:
 *                   type: string
 *                   description: Dirección de la ubicación
 *       400:
 *         description: Error en los datos proporcionados (validación fallida)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema
 *       409:
 *         description: Conflicto - El nombre de la ubicación ya existe
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
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 - 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloUbicacion.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("direccion").optional(), 
    controladorUbicacion.guardar);

 /**
 * @swagger
 * /ubicaciones/editar:
 *   put:
 *     summary: Edita una ubicación existente
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la ubicación (opcional)
 *               direccion:
 *                 type: string
 *                 description: Dirección de la ubicación
 *     responses:
 *       200:
 *         description: Ubicación editada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la ubicación
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la ubicación
 *                 direccion:
 *                   type: string
 *                   description: Dirección de la ubicación
 *       400:
 *         description: Error en los datos proporcionados (validación fallida)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema
 *       404:
 *         description: Ubicación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error si no se encuentra la ubicación
 */


    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloUbicacion.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("direccion").optional(), 
        controladorUbicacion.editar);

/**
 * @swagger
 * /ubicaciones/eliminar:
 *   delete:
 *     summary: Elimina una ubicación existente
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación que se desea eliminar
 *     responses:
 *       200:
 *         description: Ubicación eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de eliminación
 *       400:
 *         description: Error en los datos proporcionados (validación fallida)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema
 *       404:
 *         description: Ubicación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error si no se encuentra la ubicación
 */


    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloUbicacion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorUbicacion.eliminar);
module.exports = rutas;