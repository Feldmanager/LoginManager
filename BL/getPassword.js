const axios = require('axios');
const config = require('./generateConfig');


const USERS_URL = global.gConfig.getUserURL

let getUserPassword = async function(username) {
    var result = await axios.get(`${USERS_URL}${username}`)

    return result.data.Password
}

module.exports = getUserPassword