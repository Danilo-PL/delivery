const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPedidos = require('../controladores/controladorPedidos');
const ModeloPedidos = require('../modelos/pedido');
const rutas = Router();
rutas.get('/',controladorPedidos.inicio); 

/**
 * @swagger
 * /pedidos/listar:
 *   get:
 *     summary: Obtiene la lista de pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del pedido
 *                   cliente_id:
 *                     type: integer
 *                     description: Identificador del cliente que realizó el pedido
 *                   total:
 *                     type: number
 *                     format: float
 *                     description: Monto total del pedido
 *                   estado:
 *                     type: string
 *                     description: Estado del pedido
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se realizó el pedido
 *       404:
 *         description: No se encontraron pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay pedidos
 */


rutas.get('/listar', controladorPedidos.listar);

/**
 * @swagger
 * /pedidos/guardar:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: Estado del pedido
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se realiza el pedido en formato YYYY-MM-DD
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Monto total del pedido, debe ser mayor o igual a 0
 *     responses:
 *       201:
 *         description: Pedido creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 pedido:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Identificador único del nuevo pedido
 *                   required:
 *                     - id
 *       400:
 *         description: Solicitud incorrecta, se devuelven mensajes de error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

rutas.post('/guardar',
    body("estado").isLength({min: 3, max: 20}).withMessage('El nombre debe tener entre 3 - 20 caracteres'),
    body("fecha").isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
    body("total").isFloat({gt: 0}) .withMessage('El total debe ser un número decimal válido mayor o igual a 0')
    /*.custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloPedidos.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    })*/, 
    controladorPedidos.guardar);
/**
 * @swagger
 * /pedidos/editar:
 *   put:
 *     summary: Actualiza un pedido existente
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del pedido a actualizar
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: Estado del pedido
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se actualiza el pedido en formato YYYY-MM-DD
 *               total:
 *                 type: number
 *                 format: float
 *                 description: Monto total del pedido, debe ser mayor o igual a 0
 *     responses:
 *       200:
 *         description: Pedido actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       404:
 *         description: El pedido no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el pedido no existe
 *       400:
 *         description: Solicitud incorrecta, se devuelven mensajes de error
 */

    
    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        /*.custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloPedidos.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        })*/,
        body("estado").isLength({min: 3, max: 20}).isOptional().withMessage('El nombre debe tener entre 3 - 20 caracteres'),
        body("fecha").isDate({ format: 'YYYY-MM-DD' }).isOptional().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
        body("total").isFloat({gt: 0}).isOptional().withMessage('El total debe ser un número decimal válido mayor o igual a 0')
        /*.custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloPedidos.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        })*/, 
        controladorPedidos.editar);

      /**
 * @swagger
 * /pedidos/eliminar:
 *   delete:
 *     summary: Elimina un pedido existente
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del pedido a eliminar
 *     responses:
 *       200:
 *         description: Pedido eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       404:
 *         description: El pedido no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el pedido no existe
 *       400:
 *         description: Solicitud incorrecta, se devuelven mensajes de error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que hay un error en la solicitud
 */


    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    /*.custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloPedidos.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    })*/,
    controladorPedidos.eliminar);
module.exports = rutas;