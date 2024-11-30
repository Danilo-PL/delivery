const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Ubicacion = db.define(
    "ubicacion",
    {
        latitud: {
            type: sequelize.FLOAT,
            allowNull: false,
        },
        longitud: {
            type: sequelize.FLOAT,
            allowNull: false,
        }
    },
    {
        tableName: "ubicaciones"
    }
);

module.exports = Ubicacion;

/*const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        const locationData = JSON.parse(message);
        //actualizas la ubicación en la base de datos o en la memoria temporal
        broadcastLocation(locationData);
    });
});

function broadcastLocation(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}*/

/*<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script>
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    const marker = new google.maps.Marker({ map: map });

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = event => {
        const location = JSON.parse(event.data);
        const pos = { lat: location.latitude, lng: location.longitude };
        marker.setPosition(pos);
        map.setCenter(pos);
    };
</script>*/

