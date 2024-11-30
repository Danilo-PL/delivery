const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../controladores/controladorCliente');
const ModeloCliente = require('../modelos/cliente');
const rutas = Router();
rutas.get('/',controladorCliente.inicio); 

/**
 * @swagger
 * /clientes/listar:
 *   get:
 *     summary: Obtiene la lista de los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del cliente
 *                   identidad:
 *                     type: string
 *                     description: Identificación del cliente
 *                   nombre:
 *                     type: string
 *                     description: Nombre del cliente
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del cliente
 *                   correo:
 *                     type: string
 *                     description: Correo electrónico del cliente
 *                   direccion:
 *                     type: string
 *                     description: Dirección del cliente
 *                   activo:
 *                     type: boolean
 *                     description: Indica si el cliente está activo
 */



rutas.get('/listar', controladorCliente.listar);

/**
 * @swagger
 * /clientes/guardar:
 *   post:
 *     summary: Guarda un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identificación del cliente
 *                 
 *                 minLength: 13
 *                 maxLength: 15
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente
 *                 
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente
 *                 
 *                 minLength: 8
 *                 maxLength: 15
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente (opcional)                 
 *                 maxLength: 50
 *               direccion:
 *                 type: string
 *                 description: Dirección del cliente (opcional)
 *             required:
 *               - identidad
 *               - nombre
 *               - telefono
 *     responses:
 *       201:
 *         description: Cliente creado con éxito
 *       400:
 *         description: Error en la validación de datos
 */



rutas.post('/guardar',
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 - 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCliente.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("direccion").optional(),body("correo").optional(),body("telefono").isLength({max: 15}).custom(async value =>{//probar este if, no debe de permitir valores nulos
        if(!value){
            throw new Error('Eltelefono no permite valores nulos');
        }}),
    controladorCliente.guardar);

/**
 * @swagger
 * /clientes/editar:
 *   put:
 *     summary: Edita un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificador único del cliente que se va a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identificación del cliente (opcional)
 *                 minLength: 13
 *                 maxLength: 15
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente (opcional)
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente (opcional)
 *                 minLength: 8
 *                 maxLength: 15
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente (opcional)
 *                 maxLength: 50
 *               direccion:
 *                 type: string
 *                 description: Dirección del cliente (opcional)
 *     responses:
 *       200:
 *         description: Cliente editado con éxito
 *       400:
 *         description: Error en la validación de datos
 *       404:
 *         description: Cliente no encontrado
 */


    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloCliente.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("direccion").optional(),body("correo").optional(),
        controladorCliente.editar);
    
/**
 * @swagger
 * /clientes/eliminar:
 *   delete:
 *     summary: Elimina un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificador único del cliente que se va a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       400:
 *         description: Error en la validación del ID proporcionado
 *       404:
 *         description: Cliente no encontrado
 */

    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCliente.eliminar);
module.exports = rutas;