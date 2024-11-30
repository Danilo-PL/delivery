const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleado = require('../controladores/controladorEmpleado');
const ModeloEmpleado = require('../modelos/empleado');
const rutas = Router();
rutas.get('/',controladorEmpleado.inicio); 
/**
 * @swagger
 * /empleados/listar:
 *   get:
 *     summary: Obtiene la lista de empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del empleado
 *                   identidad:
 *                     type: string
 *                     description: Identificación del empleado
 *                   nombre:
 *                     type: string
 *                     description: Nombre del empleado
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del empleado
 *                   correo:
 *                     type: string
 *                     description: Correo electrónico del empleado (opcional)
 *                   cargo:
 *                     type: string
 *                     description: Cargo del empleado
 *                   salario:
 *                     type: number
 *                     format: double
 *                     description: Salario del empleado
 *                   activo:
 *                     type: boolean
 *                     description: Indica si el empleado está activo
 *       404:
 *         description: No se encontraron empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay empleados
 */

rutas.get('/listar', controladorEmpleado.listar);
/**
 * @swagger
 * /Empleados/guardar:
 *   post:
 *     summary: Guarda un nuevo Empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identificación del Empleado (entre 13 y 15 caracteres)
 *                 minLength: 13
 *                 maxLength: 15
 *               nombre:
 *                 type: string
 *                 description: Nombre del Empleado (entre 3 y 50 caracteres, no puede estar en blanco)
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 description: Teléfono del Empleado (entre 8 y 15 caracteres)
 *                 minLength: 8
 *                 maxLength: 15
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del Empleado (opcional, máximo 50 caracteres)
 *                 maxLength: 50
 *               direccion:
 *                 type: string
 *                 description: Dirección del Empleado (opcional)
 *              salario:
 *                 type: number
 *                 description: salario del empleado
 *               cargo:
 *                 type: string
 *                 description: Cargo del Empleado (entre 3 y 50 caracteres)
 *                 minLength: 3
 *                 maxLength: 50
 *     responses:
 *       201:
 *         description: Empleado guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del Empleado
 *                 identidad:
 *                   type: string
 *                   description: Identificación del Empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del Empleado
 *                 direccion:
 *                   type: string
 *                   description: Dirección del Empleado
 *                 cargo:
 *                   type: string
 *                   description: Cargo del Empleado (repartidor, admin o cajero)
 *                salario:
 *                 type: number
 *                 description: salario del empleado
 *                 activo:
 *                   type: boolean
 *                   description: Indica si el Empleado está activo
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
 *         description: Conflicto - El nombre del empleado ya existe
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
            const buscarCargo = await ModeloEmpleado.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }), 
    controladorEmpleado.guardar);

/**
 * @swagger
 * /Empleados/editar:
 *   put:
 *     summary: Edita un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del empleado que se desea editar
 *         description: El ID debe ser un número entero válido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Nueva identificación del empleado (opcional)
 *                 minLength: 13
 *                 maxLength: 15
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del empleado (opcional)
 *                 minLength: 3
 *                 maxLength: 50
 *               telefono:
 *                 type: string
 *                 description: Nuevo teléfono del empleado (opcional)
 *                 minLength: 8
 *                 maxLength: 15
 *               correo:
 *                 type: string
 *                 description: Nuevo correo electrónico del empleado (opcional)
 *                 maxLength: 50
 *               direccion:
 *                 type: string
 *                 description: Nueva dirección del empleado (opcional)
 *               salario:
 *                 type: number
 *                 description: salario del empleado
 *               cargo:
 *                 type: string
 *                 description: Nuevo cargo del empleado (opcional)
 *                 minLength: 3
 *                 maxLength: 50
 *               activo:
 *                 type: boolean
 *                 description: Estado activo del empleado (opcional)
 *     responses:
 *       200:
 *         description: Empleado editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del empleado editado
 *                 identidad:
 *                   type: string
 *                   description: Identificación actualizada del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del empleado
 *                 telefono:
 *                   type: string
 *                   description: Teléfono actualizado del empleado
 *                 correo:
 *                   type: string
 *                   description: Correo electrónico actualizado del empleado
 *                 direccion:
 *                   type: string
 *                   description: Dirección actualizada del empleado
 *                salario:
 *                 type: number
 *                 description: salario del empleado
 *                 cargo:
 *                   type: string
 *                   description: Cargo actualizado del empleado
 *                 activo:
 *                   type: boolean
 *                   description: Estado activo del empleado
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
 *         description: No se encontró el empleado con el ID proporcionado
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
                const buscarCargo = await ModeloEmpleado.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
        controladorEmpleado.editar);
    
/**
 * @swagger
 * /Empleados/eliminar:
 *   delete:
 *     summary: Elimina un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del empleado que se desea eliminar
 *         description: El ID debe ser un número entero válido
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
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
 *         description: No se encontró el empleado con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   
 *                   description: Mensaje de error indicando que el ID no existe
 */


    rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorEmpleado.eliminar);
module.exports = rutas;