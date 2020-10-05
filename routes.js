const express = require('express');
const router = express.Router()
const getPassword = require('./BL/getPassword')
const getGroups = require('./BL/getGroups')
const jwt = require("jsonwebtoken");

const SECRET_KEY = "#$DarNach"

router.post('/', (req, res) => {
    var passwordFromUser = req.body['password']
    var username = req.body['username']

    if(!passwordFromUser || !username){ 
        res.status(404).send({'errorContent': 'Invalid input'})
    }

    var passwordFromDB = getPassword.getUsersPassword(username)
    if(passwordFromUser === passwordFromDB){
        var token = generateAccessToken(username)
        res.cookie("token", token, {secure: true, httpOnly: true})
        res.send()
    }else{
        res.status(404).send({'errorContent': 'Invalid input'})
    }
})

function generateAccessToken(username) {
    return jwt.sign(username, SECRET_KEY);
}

module.exports = router