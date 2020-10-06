const axios = require('axios');
const config = require('./generateConfig');

const GROUPS_URL = global.gConfig.getGroupsURL

let getGroups = async function(username) {
    var result = await axios.get(`${GROUPS_URL}${username}`, {timeout: global.gConfig.requestTimeout})

    var allGroups = result.data
    var groupIds = []
    for(var i=0; i<allGroups.length; i++){
        groupIds.push(allGroups[i].GroupId)
    }

    return groupIds
}

module.exports = getGroups