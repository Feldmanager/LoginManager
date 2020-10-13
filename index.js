const express = require('express');
const app = express();
const routes = require('./routes')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require('./config/generateConfig');
const cors = require("cors")
const {Authorize, UserInvalidInputError} = require('commonframework');

const ALLOWED_ORIGINS = global.gLoginConfig.allowedOrigins

var corsOptions = {
    origin: ALLOWED_ORIGINS,
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
        servers: [`http://localhost:${global.gLoginConfig.node_port}`]
        }
    },
    apis: ["Swagger\\Docs\\*.yaml"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use((req, res, next) => {
    req.user = req.body.username;
    next();
})

app.use(Authorize)

app.use('/Login', routes)

function errHandler(err, req, res, next) {
    if (err) {
        if (err instanceof UserInvalidInputError){
            res.status(400).send(err.message)
        }else{
            res.status(500).send(err.message)
        }
    }
}
app.use(errHandler);
app.listen(global.gLoginConfig.node_port, () => {
    console.log("server up and running");
})