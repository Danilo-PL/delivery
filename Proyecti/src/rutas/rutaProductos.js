const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProducto = require('../controladores/controladorProducto');
const ModeloProducto = require('../modelos/producto');
const rutas = Router();
rutas.get('/',controladorProducto.inicio);

/**
 * @swagger
 * /productos/listar:
 *   get:
 *     summary: Obtiene la lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del producto
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: Precio del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad disponible en stock
 *                   categoria:
 *                     type: string
 *                     description: Categoría a la que pertenece el producto
 *       404:
 *         description: No se encontraron productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay productos
 */


rutas.get('/listar', controladorProducto.listar);

/**
 * @swagger
 * /productos/guardar:
 *   post:
 *     summary: Guarda un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto (entre 3 y 50 caracteres, no puede estar en blanco)
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto (opcional)
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible en stock
 *     responses:
 *       201:
 *         description: Producto guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del producto
 *                 nombre:
 *                   type: string
 *                   description: Nombre del producto
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del producto
 *                 precio:
 *                   type: number
 *                   description: Precio del producto
 *                 disponible:
 *                   type: boolean
 *                   description: Indica si el producto está disponible
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
 *         description: Conflicto - El nombre del producto ya existe
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
            const buscarCargo = await ModeloProducto.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),body("precio").isFloat({gt: 0}).withMessage('El precio no puede ser 0')
    .custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),  
    controladorProducto.guardar);

/**
 * @swagger
 * /productos/editar:
 *   put:
 *     summary: Edita un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del producto que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del producto (entre 3 y 50 caracteres, no puede estar en blanco)
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del producto (opcional)
 *               precio:
 *                 type: number
 *                 description: Nuevo precio del producto (opcional)
 *               disponible:
 *                 type: boolean
 *                 description: Indica si el producto está disponible (opcional)
 *     responses:
 *       200:
 *         description: Producto editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del producto editado
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del producto
 *                 descripcion:
 *                   type: string
 *                   description: Descripción actualizada del producto
 *                 precio:
 *                   type: number
 *                   description: Precio actualizado del producto
 *                 disponible:
 *                   type: boolean
 *                   description: Estado de disponibilidad del producto
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
 *         description: No se encontró el producto con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando que el ID no existe
 *       409:
 *         description: Conflicto - El nombre del producto ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error sobre el conflicto
 */

    rutas.put('/editar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloProducto.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 - 50 caracteres')
        .custom(async value =>{
            if(!value){
                throw new Error('El nombre no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloProducto.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        }),body("precio").isFloat({gt: 0}).withMessage('El precio no puede ser 0')
        .custom(async value =>{
            if(!value){
                throw new Error('El precio no permite valores nulos');
            }
        }),   
        controladorProducto.editar);

/**
 * @swagger
 * /productos/eliminar:
 *   delete:
 *     summary: Elimina un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del producto que se desea eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmación de eliminación
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
 *         description: No se encontró el producto con el ID proporcionado
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
            const buscarCargo = await ModeloProducto.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorProducto.eliminar);

/**
 * @swagger
 * /productos/buscar:
 *   get:
 *     summary: Busca un producto por su ID
 *     tags: [Productos]
 *     requestBody:
 *       content:
 *         application/json:
 *         schema:
 *             type: object
 *             properties:
 *               Id:
 *                  type: integer
 *                  description: Identificador único del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipo:
 *                   type: integer
 *                   description: 1 si se encontró el producto, 0 si no.
 *       400:
 *         description: Error en los datos proporcionados (validación fallida)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   description: Array de mensajes de error de validación
 *       404:
 *         description: Usuario o contraseña incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el usuario o contraseña es incorrecto
 *       500:
 *         description: Error en el servidor al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema en el servidor
 */
    rutas.get('/buscar',
        query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value =>{
            if(!value){
                throw new Error('El id no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloProducto.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        controladorProducto.buscar);
module.exports = rutas;