const http = require('http')

const config = require('./generateConfig');

const GROUPS_URL = global.gConfig.getGroupsURL

let getGroups = async function(username) {
    var result = await axios.get(`${GROUPS_URL}${username}`, {timeout: global.gConfig.requestTimeout})

    return result.data.Groups
}

module.exports = getGroups