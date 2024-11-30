const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const { info } = require("console");

const options= {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "proyecto",
            version: "1.0.0",
            description: "delivery"
        },

        servers:[
            {
                url: "http://localhost:" + process.env.PORT +"/api",
                description: "Servidor local"
            }
        ]

    },
    apis: [path.join(__dirname, "../rutas/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;