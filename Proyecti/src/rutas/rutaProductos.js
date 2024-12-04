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
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del producto
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: Precio del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad disponible en stock
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
 *                 description: Nombre del producto
 *                 minLength: 3
 *                 maxLength: 50
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto (debe ser mayor a 0)
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto (opcional)
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible en stock (opcional)
 *             required:
 *               - nombre
 *               - precio
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del producto creado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del producto
 *                 precio:
 *                   type: number
 *                   format: float
 *                   description: Precio del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad disponible en stock
 *       400:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje detallando el error
 *       409:
 *         description: Conflicto, el producto ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el producto ya existe
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
    }),body("Precio").isFloat({min: 0.01}).withMessage('El precio no puede ser 0')
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
 *         description: Identificador único del producto a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del producto
 *                 minLength: 3
 *                 maxLength: 50
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Nuevo precio del producto (debe ser mayor a 0)
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del producto (opcional)
 *               stock:
 *                 type: integer
 *                 description: Nueva cantidad disponible en stock (opcional)
 *             required:
 *               - nombre
 *               - precio
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
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
 *                 precio:
 *                   type: number
 *                   format: float
 *                   description: Precio actualizado del producto
 *                 stock:
 *                   type: integer
 *                   description: Stock actualizado del producto
 *       400:
 *         description: Error en la validación de los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje detallando el error
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el producto no existe
 *       409:
 *         description: Conflicto, el nombre del producto ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el nombre ya está en uso
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
        }),body("Precio").isFloat({min: 0.01}).withMessage('El precio no puede ser 0')
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
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador único del producto a eliminar
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
 *                   description: Mensaje indicando que el producto fue eliminado
 *       400:
 *         description: Error en la validación del ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje detallando el error
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el producto no existe
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
module.exports = rutas;