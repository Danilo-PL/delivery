const ModeloVenta = require('../modelos/venta');
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
        await ModeloVenta.findAll()
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
    const { clienteId, fecha_venta, total, empleadoId  } = req.body;
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
            await ModeloVenta.create({...req.body})
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
            await ModeloVenta.update(
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
            await ModeloVenta.destroy({where: {id: id}})
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
//Deinar Jared Mejia Morales