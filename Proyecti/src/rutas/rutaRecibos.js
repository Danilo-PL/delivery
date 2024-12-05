const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRecibo = require('../controladores/controladorRecibo');
const ModeloRecibo = require('../modelos/recibo');
const rutas = Router();
rutas.get('/',controladorRecibo.inicio); 

/**
 * @swagger
 * /recibos/listar:
 *   get:
 *     summary: Obtiene la lista de recibos
 *     tags: [Recibos]
 *     responses:
 *       200:
 *         description: Lista de recibos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del recibo
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del recibo
 *                   monto_total:
 *                     type: number
 *                     format: float
 *                     description: Monto total del recibo
 *                   cliente_id:
 *                     type: integer
 *                     description: Identificador del cliente asociado al recibo
 *                   estado:
 *                     type: string
 *                     description: Estado del recibo
 *       404:
 *         description: No se encontraron recibos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay recibos
 */

rutas.get('/listar', controladorRecibo.listar);
/**
 * @swagger
 * /recibos/guardar:
 *   post:
 *     summary: Guarda un nuevo recibo
 *     tags: [Recibos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto_total:
 *                 type: string
 *                 description: Monto total del recibo (debe ser un valor numérico positivo)
 *     responses:
 *       201:
 *         description: Recibo guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del recibo
 *                 monto_total:
 *                   type: string
 *                   description: Monto total del recibo
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
 *         description: Conflicto - El recibo ya existe
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
    body("monto_total").isFloat({gt: 0}).withMessage('monto no puede ser 0')
    .custom(async value =>{
        if(!value){
            throw new Error('El monto_total no permite valores nulos');
        }
    }), 
    controladorRecibo.guardar);

/**
 * @swagger
 * /recibos/editar:
 *   put:
 *     summary: Edita un recibo existente
 *     tags: [Recibos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del recibo a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto_total:
 *                 type: number
 *                 format: float
 *                 description: Nuevo monto total del recibo
 *     responses:
 *       200:
 *         description: Recibo editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: El recibo no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloRecibo.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("monto_total").isFloat({gt: 0}).withMessage('monto no puede ser 0')
    .custom(async value =>{
        if(!value){
            throw new Error('El monto_total no permite valores nulos');
        }
    }),  
        controladorRecibo.editar);
/**
 * @swagger
 * /recibos/eliminar:
 *   delete:
 *     summary: Elimina un recibo existente
 *     tags: [Recibos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recibo a eliminar
 *     responses:
 *       200:
 *         description: Recibo eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito indicando la eliminación
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
 *         description: No se encontró el recibo con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando que el ID del recibo no existe
 */

    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloRecibo.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorRecibo.eliminar);
module.exports = rutas;