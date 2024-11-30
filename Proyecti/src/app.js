const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configuracion/swagger');

const db = require('./configuracion/db');
//const { CrearModelos } = require('./modelos');
const modeloCliente = require('./modelos/cliente');
const modeloEmpleado = require('./modelos/empleado');
const modeloProducto = require('./modelos/producto');
const modeloVenta = require('./modelos/venta');
const modeloVenta_Detalle = require('./modelos/venta_detalle');
const modeloRecibo = require('./modelos/recibo');
const modeloUsuario = require('./modelos/usuario');
const modeloEntrega = require('./modelos/entrega');

const ModeloUbicacion = require('./modelos/ubicacion');
const ModeloRestaurante = require('./modelos/restaurante');
const modeloVehiculo = require('./modelos/vehiculo');


db.authenticate()
.then( async (data)=>{
    console.log("Conexion establecida");

    //ventas
    modeloEmpleado.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloEmpleado);

    modeloCliente.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloCliente);

    modeloVenta.hasMany(modeloVenta_Detalle);
    modeloVenta_Detalle.belongsTo(modeloVenta);

    modeloProducto.hasMany(modeloVenta_Detalle);
    modeloVenta_Detalle.belongsTo(modeloProducto);

    //recibo
    modeloVenta.hasMany(modeloRecibo);
    modeloRecibo.belongsTo(modeloVenta);

    modeloCliente.hasMany(modeloRecibo);
    modeloRecibo.belongsTo(modeloCliente);

    //usuario
    modeloUsuario.belongsTo(modeloEmpleado);

    //entrega
    modeloEntrega.belongsTo(modeloVenta);
    
    modeloEmpleado.hasMany(modeloEntrega);
    modeloEntrega.belongsTo(modeloEmpleado);

    //vehiculo
    modeloVehiculo.belongsTo(modeloEmpleado);

    await modeloEmpleado.sync().then((da)=>{
        console.log("Modelo Empleado creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo empleado "+ e);
    });

    await modeloCliente.sync().then((da)=>{
        console.log("Modelo Cliente creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cliente "+ e);
    });

    await modeloProducto.sync().then((da)=>{
        console.log("Modelo producto creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo producto "+ e);
    });

    await modeloUsuario.sync().then((da)=>{
        console.log("Modelo usuario creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo usuario "+ e);
    });

    await modeloVenta.sync().then((da)=>{
        console.log("Modelo venta creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo venta "+ e);
    });

    await modeloVenta_Detalle.sync().then((da)=>{
        console.log("Modelo venta detalle creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo venta detalle "+ e);
    });
    
    await modeloRecibo.sync().then((da)=>{
        console.log("Modelo recibo creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo recibo "+ e);
    });

    await modeloEntrega.sync().then((da)=>{
        console.log("Modelo entrega creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo entrega "+ e);
    });

    await ModeloRestaurante.sync().then((da)=>{
        console.log("Modelo restuarante creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo restaurante "+ e);
    });

    await ModeloUbicacion.sync().then((da)=>{
        console.log("Modelo ubicacion creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ubicacion "+ e);
    });
})
.catch((er)=>{
    console.log("Error: " + er);
});
const limitador = rateLimit({
    windowMs: 1000 * 60 * 10,
    max: 100
});


const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(helmet());
app.use(limitador);
app.use(cors(require('./configuracion/cors')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', require('./rutas'));
app.use('/api/clientes', require('./rutas/rutaClientes'));
app.use('/api/empleados', require('./rutas/rutaEmpleados'));
app.use('/api/productos', require('./rutas/rutaProductos'));
app.use('/api/ventas', require('./rutas/rutaVentas'));
app.use('/api/venta_detalles', require('./rutas/rutaVenta_Detalles'));
app.use('/api/recibos', require('./rutas/rutaRecibos'));
app.use('/api/usuarios', require('./rutas/rutaUsuarios'));
app.use('/api/entregas', require('./rutas/rutaEntregas'));
app.use('/api/restaurantes', require('./rutas/rutaRestaurantes'));
app.use('/api/ubicaciones', require('./rutas/rutaUbicaciones'));
//app.use('/api/pedidos',require('./rutas/rutaPedidos'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);

    module.exports = app;
})
app.listen(process.env.PORT, ()=>{
    console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});

