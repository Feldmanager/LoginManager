const express = require('express');
const router = express.Router()
const getPassword = require('./BL/getPassword')
const getGroups = require('./BL/getGroups')
const jwt = require("jsonwebtoken");

const SECRET_KEY = "#$BenGay"


router.post('/', async (req, res) => {
    var passwordFromUser = req.body.password
    var username = req.body.username

    try{
        var passwordFromDB = await getPassword(username)
        if(passwordFromUser === passwordFromDB){
            var groups = await getGroups(username)
            var token = generateAccessToken(username)
            res.contentType('application/json');
            res.status(200).send({"token": token, "username": username, "groupIds": groups})
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