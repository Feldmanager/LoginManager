const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
        version: "1.0.0",
        title: "Login API",
        description: "Login API",
        contact: {
            name: "Amazing Developer"
        },
        servers: [`http://localhost:${global.gLoginConfig.node_port}`]
        }
    },
    apis: ["Swagger\\Docs\\*.yaml"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs