const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRestaurante = require('../controladores/controladorRestaurante');
const ModeloRestaurante = require('../modelos/restaurante');
const rutas = Router();
rutas.get('/',controladorRestaurante.inicio);

/**
 * @swagger
 * /restaurantes/listar:
 *   get:
 *     summary: Obtiene la lista de restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: Lista de restaurantes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del restaurante
 *                   nombre:
 *                     type: string
 *                     description: Nombre del restaurante
 *                   direccion:
 *                     type: string
 *                     description: Dirección del restaurante
 *                   telefono:
 *                     type: string
 *                     description: Número de teléfono del restaurante
 *                   activo:
 *                     type: boolean
 *                     description: Indica si el restaurante está activo
 *       404:
 *         description: No se encontraron restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay restaurantes
 */

rutas.get('/listar', controladorRestaurante.listar);
/**
 * @swagger
 * /restaurantes/guardar:
 *   post:
 *     summary: Guarda un nuevo restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del restaurante (entre 3 y 50 caracteres, no puede estar en blanco)
 *               direccion:
 *                 type: string
 *                 description: Dirección del restaurante
 *               telefono:
 *                 type: string
 *                 description: Número de contacto del restaurante
 *               abierto:
 *                 type: boolean
 *                 description: Indica si el restaurante está abierto
 *     responses:
 *       201:
 *         description: Restaurante guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del restaurante
 *                 nombre:
 *                   type: string
 *                   description: Nombre del restaurante
 *                 direccion:
 *                   type: string
 *                   description: Dirección del restaurante
 *                 telefono:
 *                   type: string
 *                   description: Número de contacto del restaurante
 *                 abierto:
 *                   type: boolean
 *                   description: Indica si el restaurante está abierto
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
 *         description: Conflicto - El nombre del restaurante ya existe
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
            const buscarCargo = await ModeloRestaurante.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }), 
    controladorRestaurante.guardar);

/**
 * @swagger
 * /restaurantes/editar:
 *   put:
 *     summary: Edita un restaurante existente
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del restaurante que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del restaurante (opcional)
 *               direccion:
 *                 type: string
 *                 description: Nueva dirección del restaurante (opcional)
 *               telefono:
 *                 type: string
 *                 description: Nuevo número de contacto del restaurante (opcional)
 *               abierto:
 *                 type: boolean
 *                 description: Estado actual del restaurante (opcional)
 *     responses:
 *       200:
 *         description: Restaurante editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del restaurante editado
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del restaurante
 *                 direccion:
 *                   type: string
 *                   description: Dirección actualizada del restaurante
 *                 telefono:
 *                   type: string
 *                   description: Número de contacto actualizado
 *                 abierto:
 *                   type: boolean
 *                   description: Estado actual del restaurante
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
 *         description: No se encontró el restaurante con el ID proporcionado
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
                const buscarCargo = await ModeloRestaurante.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }), 
        controladorRestaurante.editar);
/**
 * @swagger
 * /restaurantes/eliminar:
 *   delete:
 *     summary: Elimina un restaurante existente
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del restaurante que se desea eliminar
 *     responses:
 *       200:
 *         description: Restaurante eliminado con éxito
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
 *         description: No se encontró el restaurante con el ID proporcionado
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
            const buscarCargo = await ModeloRestaurante.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorRestaurante.eliminar);
module.exports = rutas;