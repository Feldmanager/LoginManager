const express = require('express');
const app = express();
const routes = require('./routes')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SECRET_KEY = "#$DarNach"

const swaggerOptions = {
    swaggerDefinition: {
        info: {
        version: "1.0.0",
        title: "Login API",
        description: "Login API",
        contact: {
            name: "Amazing Developer"
        },
        servers: ["http://localhost:666"]
        }
    },
    apis: ["index.js"]
    };
    
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());


/**
 * @swagger
 * /Login:
 *  post:
 *    description: Login user
 *    consumes:
*      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to login
 *        schema:
 *           type: object
 *           required: 
 *              - username
 *              - password
 *           properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
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
app.listen(666, () => {
    console.log("server up and running");
})