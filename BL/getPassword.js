const axios = require('axios');
const config = require('./generateConfig');

const source = axios.CancelToken.source()
const USERS_URL = global.gConfig.getUserURL

const getUserPassword = async function(username) {
    var result = await axios.get(`${USERS_URL}${username}`, {timeout: global.gConfig.requestTimeout})

    return result.data.Password
}

module.exports = getUserPassword