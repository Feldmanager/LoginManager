const axios = require('axios');
const config = require('../config/generateConfig');

const USERS_URL = global.gConfig.getUserURL

const getUserPassword = async function(username) {
    let result = await axios.get(`${USERS_URL}${username}`, {timeout: global.gConfig.requestTimeout})

    return result.data.Password
}

module.exports = getUserPassword