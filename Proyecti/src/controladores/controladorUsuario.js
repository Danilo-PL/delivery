const ModeloUsuario = require('../modelos/usuario');
const { enviar, errores } = require('../configuracion/ayuda');
const { validationResult } = require('express-validator');
const { enviarCorreo } = require('../configuracion/correo');
const ModeloEmpleado = require('../modelos/empleado');
const { Op } = require('sequelize');
const crypto = require('crypto');
const argon2 = require('argon2');
const { getToken } = require('../configuracion/passport');

exports.inicio = (req, res)=>{
    console.log(req);
    res.json({msj: "Hola"});
};

const generarPin = () => {
    return crypto.randomBytes(3).toString('hex').slice(0, 6);
  }

exports.listar = async (req, res)=>{
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    try {
        await ModeloUsuario.findAll()
        .then(((data)=>{
            contenido.tipo=1;
            contenido.datos=data;
            enviar(200, contenido, res);
        }))
        .catch((er)=>{
            contenido.tipo=0;
            contenido.msj="Error al cargar los datos del cargo";
            enviar(200, contenido, res);
        });
    } catch (error) {
        contenido.tipo=0;
        contenido.msj= "Error en el servidor";
        enviar(500, contenido, res);
    }
};

exports.guardar = async (req, res) => {
    const { rol, email, password, empleadoId } = req.body;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB
      timeCost: 4,
      parallelism: 2,
  });
    contenido.msj= errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloUsuario.create({...req.body,password:hash})
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=0;
                contenido.msj= "Error en la consulta";
                enviar(200, contenido, res);    
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj= "Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};

exports.editar = async (req, res) => {
    const { id } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj= errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloUsuario.update(
                {...req.body},
                {where: {id: id}})
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=0;
                contenido.msj= "Error en la consulta";
                enviar(200, contenido, res);    
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj= "Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};

exports.eliminar = async (req, res) => {
    const { id } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj= errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloUsuario.destroy({where: {id: id}})
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=0;
                contenido.msj= "Error en la consulta";
                enviar(200, contenido, res);    
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj= "Error en el servidor";
            enviar(500, contenido, res);
        }
    }
    
};

exports.recuperarContrasena = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
  
    try {
      const { email } = req.body;
  
      const usuario = await ModeloUsuario.findOne({
        where: {
          [Op.or]: [
            { email: { [Op.like]: email } }
          ]
        }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const nuevoPin = generarPin();
      await usuario.update({ pin: nuevoPin });
      enviarCorreo({
        para: email,
        asunto: 'Recuperación de Contraseña - Sistema delivery',
        descripcion: 'Correo enviado para la recuperación de la contraseña',
        html: `<h1>nuevo pin: ${nuevoPin}</h1><p>Hola, bienvenidos</p>`
      });
      res.json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
      console.log(error);
    }
  };

  exports.updateContrasena = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
  
    try {
      const { email, password, pin } = req.body;
  
      const usuario = await ModeloUsuario.findOne({
        where: {
          email: email
        }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      else if (usuario.pin != pin) {
        return res.status(404).json({ error: 'El pin no corresponde' });
      }
      const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64MB
        timeCost: 4,
        parallelism: 2,
      });
      await usuario.update({ password: hash });
      res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
      console.log(error);
    }
  };

  exports.InicioSesion = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
  
    try {
      const { email, password } = req.body;
  
      const usuario = await ModeloUsuario.findOne({
        atributes: ['pin', 'rol', 'email', 'password'],
        include: [
          {
            model: ModeloEmpleado,
            atributes: ['identidad', 'nombre', 'telefono', 'correo', 'cargo','Salario'],
            
          }
        ],
        where: {
          [Op.or]: [
            { email: { [Op.like]: email } },
       
          ]
          
        }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario o contrasena es incorrecto' });
      }
      else {
        if (await argon2.verify(usuario.password, password)) {
          const Usuario = {
            email: usuario.email,
            rol:usuario.rol
          };
          const Token = getToken({ id: usuario.empleadoId });
          return res.json({ Token, Usuario });
        } else {
          return res.status(404).json({ error: 'Usuario o contrasena es incorrecto' });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al momento de iniciar sesion' });
    }
  
  };