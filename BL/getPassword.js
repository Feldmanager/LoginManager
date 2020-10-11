const axios = require('axios');
const config = require('../config/generateConfig');
const {SqlHandler, UserInvalidInputError} = require('commonframework');

const USERS_URL = global.gLoginConfig.getUserURL

const getUserPassword = async function(username) {
    let sqlHandler = new SqlHandler();
    let result = await sqlHandler.Execute(`EXEC GetUserByName @Username = '${username}';`);
    if (typeof (result.recordset[0]) === "undefined") {
        throw new UserInvalidInputError("User not found");
    }
    return result.recordset[0].Password;
}

module.exports = getUserPassword