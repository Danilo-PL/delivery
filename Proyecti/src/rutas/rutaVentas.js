const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVenta = require('../controladores/controladorVenta');
const ModeloVenta = require('../modelos/venta');
const rutas = Router();
rutas.get('/',controladorVenta.inicio); 
/**
 * @swagger
 * /ventas/listar:
 *   get:
 *     summary: Obtiene la lista de ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único de la venta
 *                   cliente_id:
 *                     type: integer
 *                     description: Identificador del cliente que realizó la compra
 *                   total:
 *                     type: number
 *                     format: float
 *                     description: Monto total de la venta
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se realizó la venta
 *       404:
 *         description: No se encontraron ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay ventas
 */


rutas.get('/listar', controladorVenta.listar);

/**
 * @swagger
 * /ventas/guardar:
 *   post:
 *     summary: Guarda una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 description: Monto total de la venta (debe ser un número, no puede estar en blanco)
 *     responses:
 *       201:
 *         description: Venta guardada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la venta
 *                 total:
 *                   type: number
 *                   description: Monto total de la venta
 *                 fecha:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora en que se realizó la venta
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
 *         description: Conflicto - La venta ya existe
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
    body("total").isFloat({gt: 0}).withMessage('monto no puede ser 0')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloVenta.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }), 
    controladorVenta.guardar);

/**
 * @swagger
 * /ventas/editar:
 *   put:
 *     summary: Edita una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único de la venta que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 description: Nuevo monto total de la venta (debe ser un número, no puede estar en blanco)
 *     responses:
 *       200:
 *         description: Venta editada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de la venta editada
 *                 total:
 *                   type: number
 *                   description: Monto total actualizado de la venta
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
 *         description: No se encontró la venta con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando que el ID no existe
 */

    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloVenta.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("total").isFloat({gt: 0}).withMessage('monto no puede ser 0')
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloVenta.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        }), 
        controladorVenta.editar);

/**
 * @swagger
 * /ventas/eliminar:
 *   delete:
 *     summary: Elimina una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único de la venta que se desea eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje confirmando que la venta ha sido eliminada
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
 *         description: No se encontró la venta con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando que el ID no existe
 */

    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloVenta.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorVenta.eliminar);
module.exports = rutas;