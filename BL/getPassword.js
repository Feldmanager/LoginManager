const axios = require('axios');

const USERS_URL = "http://10.1.0.27:3000/Users/"

let getUserPassword = async function(username) {
    var result = await axios.get(`${USERS_URL}${username}`)

    return result.data.Password
}

module.exports = getUserPassword