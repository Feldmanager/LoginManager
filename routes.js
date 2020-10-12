const express = require('express');
const router = express.Router()
const getPassword = require('./BL/getPassword')
const jwt = require("jsonwebtoken");
const config = require('./config/generateConfig');
// const {GetUserAuthorization} = require('commonframework');

const SECRET_KEY = global.gLoginConfig.secretKey
const ROLES = global.gLoginConfig.authorizationMapping

router.post('/', async (req, res) => {
    let passwordFromUser = req.body.password
    let username = req.body.username

    try{
        let passwordFromDB = await getPassword(username)
        if(passwordFromUser === passwordFromDB){
            let token = generateAccessToken(username)
            let permission = req.role;
            let usersActions = ROLES[permission]
            res.contentType('application/json');
            res.status(200).send({"token": token, "username": username, "usersActions": usersActions})
        }else{
            res.status(400).send({'errorContent': 'Invalid input'})
        }
    }catch(err){
        res.status(500).send(err.message)
    }
})

function generateAccessToken(username) {
    return jwt.sign(username, SECRET_KEY);
}

module.exports = router