const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVenta_Detalle = require('../controladores/controladorVenta_Detalle');
const ModeloVenta_Detalle = require('../modelos/venta_detalle');
const rutas = Router();
rutas.get('/',controladorVenta_Detalle.inicio);

/**
 * @swagger
 * /venta_detalles/listar:
 *   get:
 *     summary: Obtiene la lista de detalles de ventas
 *     tags: [Venta_detalles]
 *     responses:
 *       200:
 *         description: Lista de detalles de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del detalle de venta
 *                   cantidad:
 *                     type: integer
 *                     description: Cantidad de productos en el detalle de venta
 *                   precio_unitario:
 *                     type: number
 *                     format: float
 *                     description: Precio por unidad del producto
 *                  isv:
 *                     type: number
 *                     format: double
 *                     description: Impuesto sobre Venta
 *                   descuento:
 *                      type: number
 *                      format: double
 *                      description: Descuento de la venta
 *                   subtotal:
 *                     type: number
 *                     format: float
 *                     description: Subtotal calculado para este detalle de venta
 *                   id_venta:
 *                     type: integer
 *                     description: Identificador de la venta a la que pertenece este detalle
 *       404:
 *         description: No se encontraron detalles de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay detalles de ventas
 */


rutas.get('/listar', controladorVenta_Detalle.listar);

/**
 * @swagger
 * /venta_detalles/guardar:
 *   post:
 *     summary: Guarda un nuevo detalle de venta
 *     tags: [Venta_detalles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad de productos en la venta (debe ser mayor que 0)
 *     responses:
 *       201:
 *         description: Detalle de venta guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del detalle de venta
 *                 cantidad:
 *                   type: integer
 *                   description: Cantidad de productos
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
 *         description: Conflicto - El detalle de venta ya existe
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
    body("cantidad").isInt({min: 1}).withMessage('cantidad no puede ser 0')
    .custom(async value =>{
        if(!value){
            throw new Error('La cantidad no permite valores nulos');
        }
    }), 
    controladorVenta_Detalle.guardar);

/**
 * @swagger
 * /venta_detalles/editar:
 *   put:
 *     summary: Edita un detalle de venta existente
 *     tags: [Venta_detalles]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Identificador único del detalle de venta a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Nueva cantidad de productos en la venta (debe ser mayor que 0)
 *     responses:
 *       200:
 *         description: Detalle de venta editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del detalle de venta
 *                 cantidad:
 *                   type: integer
 *                   description: Cantidad actualizada de productos
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
 *         description: Detalle de venta no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error sobre el detalle de venta
 */


    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloVenta_Detalle.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("cantidad").isInt({min: 1}).withMessage('cantidad no puede ser 0')
        .custom(async value =>{
        if(!value){
            throw new Error('La cantidad no permite valores nulos');
        }
    }), 
        controladorVenta_Detalle.editar);
/**
 * @swagger
 * /venta_detalles/eliminar:
 *   delete:
 *     summary: Elimina un detalle de venta existente
 *     tags: [Venta_detalles]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Identificador único del detalle de venta a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado con éxito
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
 *         description: Detalle de venta no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error sobre el detalle de venta
 */

    
    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloVenta_Detalle.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorVenta_Detalle.eliminar);
module.exports = rutas;