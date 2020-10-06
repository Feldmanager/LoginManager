const express = require('express');
const router = express.Router()
const getPassword = require('./BL/getPassword')
const getGroups = require('./BL/getGroups')
const jwt = require("jsonwebtoken");

const SECRET_KEY = "#$DarNach"


router.post('/', async (req, res) => {
    var passwordFromUser = req.body.password
    var username = req.body.username

    try{
        var passwordFromDB = await getPassword(username)
        if(passwordFromUser === passwordFromDB){
            //var groups = getGroups(username)
            var token = generateAccessToken(username)
            res.contentType('application/json');
            //res.status(200).send({"token": token, "groupIds": groups})
            res.status(200).send({"token": token})
        }else{
            res.status(400).send({'errorContent': 'Invalid input'})
        }
    
    }catch(err){
        res.status(404).send(err.message)
    }
})

function generateAccessToken(username) {
    return jwt.sign(username, SECRET_KEY);
}

module.exports = router