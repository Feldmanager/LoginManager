const express = require('express');
const router = express.Router()
const getPassword = require('./BL/getPassword')
const getGroupsByUsername = require('./BL/getGroupsByUsername')
const jwt = require("jsonwebtoken");
const config = require('./config/generateConfig');

const SECRET_KEY = global.gLoginConfig.secretKey
const ROLES = global.gLoginConfig.roles

router.post('/', async (req, res) => {
    let passwordFromUser = req.body.password
    let username = req.body.username

    try{
        let passwordFromDB = await getPassword(username)
        if(passwordFromUser === passwordFromDB){
            let token = generateAccessToken(username)
            res.contentType('application/json');
            res.status(200).send({"token": token, "username": username})
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