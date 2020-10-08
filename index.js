const express = require('express');
const app = express();
const routes = require('./routes')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require('./config/generateConfig');
const cors = require("cors")

var corsOptions = {
    origin: [`http://localhost:3001`, `http://10.1.0.27:3001`],
    optionsSuccessStatus: 200,
}

const swaggerOptions = {
    swaggerDefinition: {
        info: {
        version: "1.0.0",
        title: "Login API",
        description: "Login API",
        contact: {
            name: "Amazing Developer"
        },
        servers: [`http://localhost:${global.gConfig.node_port}`]
        }
    },
    apis: ["Swagger\\Docs\\*.yaml"]
};
    
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


app.use('/Login', routes)

function errHandler(err, req, res, next) {
    if (err) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);
app.listen(global.gConfig.node_port, () => {
    console.log("server up and running");
})