const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVehiculo = require('../controladores/controladorVehiculo');
const ModeloVehiculo = require('../modelos/vehiculo');
const rutas = Router();
rutas.get('/',controladorVehiculo.inicio); 

/**
 * @swagger
 * /vehiculos/listar:
 *   get:
 *     summary: Obtiene la lista de vehículos
 *     tags: [Vehículos]
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del vehículo
 *                   modelo:
 *                     type: string
 *                     description: Modelo del vehículo
 *                   marca:
 *                     type: string
 *                     description: Marca del vehículo
 *                   año:
 *                     type: integer
 *                     description: Año de fabricación del vehículo
 *                   color:
 *                     type: string
 *                     description: Color del vehículo
 *                   vehiculo_tipo:
 *                     type: string
 *                     description: Tipo de vehículo (moto, carro, bicicleta)
 *                   vehiculo_placa:
 *                     type: string
 *                     description: Placa del vehículo
 *                  vehiculo_marca:
 *                   type: string
 *                   description: Marca del vehículo
 *                   vehiculo_descripcion:
 *                     type: string
 *                     description: Descripción del vehículo
 *       404:
 *         description: No se encontraron vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay vehículos
 */


rutas.get('/listar', controladorVehiculo.listar);

/**
 * @swagger
 * /vehiculo/guardar:
 *   post:
 *     summary: Guarda un nuevo vehículo
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculo_tipo:
 *                 type: string
 *                 description: Tipo de vehículo (moto, carro, bicicleta)
 *               vehiculo_placa:
 *                 type: string
 *                 description: Placa del vehículo
 *              vehiculo_marca:
 *                   type: string
 *                   description: Marca del vehículo
 *               vehiculo_descripcion:
 *                 type: string
 *                 description: Descripción del vehículo
 *     responses:
 *       201:
 *         description: Vehículo guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del vehículo
 *                 vehiculo_tipo:
 *                   type: string
 *                   description: Tipo de vehículo
 *                 vehiculo_placa:
 *                   type: string
 *                   description: Placa del vehículo
 *                 vehiculo_marca:
 *                   type: string
 *                   description: Marca del vehículo
 *                 vehiculo_descripcion:
 *                   type: string
 *                   description: Descripción del vehículo
 *                 disponible:
 *                   type: boolean
 *                   description: Indica si el vehículo está disponible
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
 *         description: Conflicto - El vehículo ya existe
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
    body("vehiculo_placa").isLength({min: 8, max: 8}).withMessage('La placa debe contener 8 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('La placa no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloVehiculo.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('La placa ya existe');
            }
        }
    }),body("vehiculo_descripcion").isLength({min: 4}).withMessage('La descripcion debe contener minimo 4 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('La descripcion  no permite valores nulos');
        }
    }),body("vehiculo_marca").optional(),
    controladorVehiculo.guardar);
/**
 * @swagger
 * /vehiculo/editar:
 *   put:
 *     summary: Edita un vehículo existente
 *     tags: [Vehículos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del vehículo que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculo_tipo:
 *                 type: string
 *                 description: Nuevo tipo de vehículo (opcional)
 *               vehiculo_marca:
 *                   type: string
 *                   description: Nueva marca del vehículo (opcional)
 *               vehiculo_placa:
 *                 type: string
 *                 description: Nueva placa del vehículo (opcional)
 *               vehiculo_descripcion:
 *                 type: string
 *                 description: Nueva descripción del vehículo (opcional)
 *     responses:
 *       200:
 *         description: Vehículo editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del vehículo editado
 *                 vehiculo_tipo:
 *                   type: string
 *                   description: Tipo actualizado del vehículo
 *                 vehiculo_placa:
 *                   type: string
 *                   description: Placa actualizada del vehículo
 *                vehiculo_marca:
 *                   type: string
 *                   description: Marca actualizada del vehículo
 *                 vehiculo_descripcion:
 *                   type: string
 *                   description: Descripción actualizada del vehículo
 *                 disponible:
 *                   type: boolean
 *                   description: Indica si el vehículo está disponible
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
 *         description: No se encontró el vehículo con el ID proporcionado
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
                const buscarCargo = await ModeloVehiculo.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),body("vehiculo_placa").isLength({min: 8, max: 8}).withMessage('La placa debe contener 8 caracteres')
        .custom(async value =>{
            if(!value){
                throw new Error('La placa no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloVehiculo.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarCargo){
                    throw new Error('La placa ya existe');
                }
            }
        }),body("vehiculo_descripcion").isLength({min: 4}).withMessage('La descripcion debe contener minimo 4 caracteres')
        .custom(async value =>{
            if(!value){
                throw new Error('La descripcion  no permite valores nulos');
            }
        }),body("vehiculo_marca").optional(),
        controladorVehiculo.editar);
/**
 * @swagger
 * /vehiculo/eliminar:
 *   delete:
 *     summary: Elimina un vehículo existente
 *     tags: [Vehículos]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del vehículo que se desea eliminar
 *     responses:
 *       200:
 *         description: Vehículo eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje confirmando la eliminación del vehículo
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
 *         description: No se encontró el vehículo con el ID proporcionado
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
            const buscarCargo = await ModeloVehiculo.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorVehiculo.eliminar);
module.exports = rutas;