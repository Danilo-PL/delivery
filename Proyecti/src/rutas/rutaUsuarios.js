const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuario = require('../controladores/controladorUsuario');
const ModeloUsuario = require('../modelos/usuario');
const rutas = Router();
rutas.get('/',controladorUsuario.inicio); 

/**
 * @swagger
 * /usuarios/listar:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario
 *                   rol:
 *                     type: string
 *                     description: Rol del usuario (admin o cajero)
 *                   pin:
 *                     type: string
 *                     description: PIN del usuario (opcional)
 *       404:
 *         description: No se encontraron usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que no hay usuarios
 */


rutas.get('/listar', controladorUsuario.listar);
/**
 * @swagger
 * /usuarios/guardar:
 *   post:
 *     summary: Guarda un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario (entre 3 y 50 caracteres, no puede estar en blanco)
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (no puede estar en blanco)
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (admin o cajero)
 *               pin:
 *                 type: string
 *                 description: PIN del usuario (opcional)
 *     responses:
 *       201:
 *         description: Usuario guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
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
 *         description: Conflicto - El email del usuario ya existe
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
    body("email").isLength({min: 11, max: 50}).withMessage('el correo debe tener minimo 11 caracteres').isEmail()
    .custom(async value =>{ 
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloUsuario.findOne({
                where: {
                    email: value
                }
            });
            if(buscarCargo){
                throw new Error('El email del cargo ya existe');
            }
        }
    }),body("password").isLength({min: 8, max: 50}).withMessage('la contrasena debe tener minimo 8 caracteres')
    .custom(async value =>{ 
        if(!value){
            throw new Error('la contrasena no permite valores nulos');
        }
    }),body("rol").isLength({min: 4, max: 10}).withMessage('el rol debe tener minimo 4 caracteres')
    .custom(async value =>{ 
        if(!value){
            throw new Error('el rol no permite valores nulos');
        }
    }),  
    controladorUsuario.guardar);

    /**
 * @swagger
 * /usuarios/editar:
 *   put:
 *     summary: Edita un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del usuario que se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nuevo email del usuario (entre 3 y 50 caracteres, no puede estar en blanco)
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario (opcional)
 *               rol:
 *                 type: string
 *                 description: Nuevo rol del usuario (admin o cajero, opcional)
 *               pin:
 *                 type: string
 *                 description: Nuevo PIN del usuario (opcional)
 *     responses:
 *       200:
 *         description: Usuario editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del usuario editado
 *                 email:
 *                   type: string
 *                   description: Email actualizado del usuario
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
 *         description: No se encontró el usuario con el ID proporcionado
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
                const buscarCargo = await ModeloUsuario.findOne({
                    where: {
                        id: value
                    }
                });
                if(!buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),body("email").isLength({min: 11, max: 50}).withMessage('el correo debe tener minimo 11 caracteres').isEmail()
        .custom(async value =>{ 
            if(!value){
                throw new Error('El email no permite valores nulos');
            }
            else{
                const buscarCargo = await ModeloUsuario.findOne({
                    where: {
                        email: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El email del cargo ya existe');
                }
            }
        }),body("password").isLength({min: 8, max: 50}).withMessage('la contrasena debe tener minimo 8 caracteres')
        .custom(async value =>{ 
            if(!value){
                throw new Error('la contrasena no permite valores nulos');
            }
        }),body("rol").isLength({min: 4, max: 10}).withMessage('el rol debe tener minimo 4 caracteres')
        .custom(async value =>{ 
            if(!value){
                throw new Error('el rol no permite valores nulos');
            }
        }),  
        controladorUsuario.editar);
/**
 * @swagger
 * /usuarios/eliminar:
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Identificador único del usuario que se desea eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
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
 *         description: No se encontró el usuario con el ID proporcionado
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
            const buscarCargo = await ModeloUsuario.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarCargo){
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorUsuario.eliminar);

/**
 * @swagger
 * /usuarios/pin:
 *   post:
 *     summary: Recupera la contraseña de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario para la recuperación de la contraseña
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación del envío del correo
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
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el usuario no existe
 *       500:
 *         description: Error en el servidor al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema en el servidor
 */

rutas.post("/pin",controladorUsuario.recuperarContrasena);

/**
 * @swagger
 * /usuarios/actualizar:
 *   post:
 *     summary: Actualiza la contraseña de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario cuya contraseña se desea actualizar
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *               pin:
 *                 type: string
 *                 description: PIN para validar la actualización de la contraseña
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la actualización
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
 *         description: Usuario no encontrado o el PIN no corresponde
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje indicando que el usuario no existe o que el PIN no es correcto
 *       500:
 *         description: Error en el servidor al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error indicando el problema en el servidor
 */

rutas.post("/actualizar",controladorUsuario.updateContrasena);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario que intenta iniciar sesión
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   description: Token de acceso generado para el usuario
 *                 Usuario:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Email del usuario
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

rutas.post("/login",controladorUsuario.InicioSesion);

module.exports = rutas;