const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
    origin:'*',
    methods:'GET,PUT,POST,DELETE',
    prefñightContinue:false,

    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization'
};

//app.use(cors(corsOptions)); poner en otro archivo? app.js?
/* 
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
app.use('/api/ubicaciones', require('./rutas/rutaUbicaciones'));*/