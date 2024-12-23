const ModeloEmpleado = require('../modelos/empleado');
const { enviar, errores } = require('../configuracion/ayuda');
const { validationResult } = require('express-validator');

exports.inicio = (req, res)=>{
    console.log(req);
    res.json({msj: "Hola"});
};

exports.listar = async (req, res)=>{
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    try {
        await ModeloEmpleado.findAll()
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
    const { identidad, nombre, telefono, correo, cargo, salario, vehiculoId  } = req.body;
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
            await ModeloEmpleado.create({...req.body})
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
            await ModeloEmpleado.update(
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
            await ModeloEmpleado.destroy({where: {id: id}})
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

exports.buscar= async (req, res) => {
    const { id } = req.query;
    var contenido = {
        tipo: 0,
        datos: null, // Inicializado como null para indicar que no se encontró nada
        msj: [],
    };

    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        enviar(200, contenido, res);
    } else {
        try {
            const empleado = await ModeloEmpleado.findOne({ where: { id: id } });

            if (empleado) {
                contenido.tipo = 1;
                contenido.datos = empleado; // Datos del empleado encontrado
                enviar(200, contenido, res);
            } else {
                contenido.tipo = 0;
                contenido.msj = "Empleado no encontrado";
                enviar(200, contenido, res);
            }
        } catch (error) {
            console.log(error);
            contenido.tipo = 0;
            contenido.msj = "Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};