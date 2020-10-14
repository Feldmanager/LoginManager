const express = require('express');
const app = express();
const routes = require('./routes')
const swaggerUi = require("swagger-ui-express");
const config = require('./config/generateConfig');
const cors = require("cors")
const {Authorize, UserInvalidInputError} = require('commonframework');
const swaggerDocs = require('./Swagger/index')
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/run/secrets/server.key', 'utf8');
const certificate = fs.readFileSync('/run/secrets/server.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};

const ALLOWED_ORIGINS = global.gLoginConfig.allowedOrigins

var corsOptions = {
    origin: ALLOWED_ORIGINS,
    optionsSuccessStatus: 200,
}

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

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(global.gLoginConfig.node_port, () => {
    console.log("server up and running");
})