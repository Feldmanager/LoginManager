const http = require('http')

const USERS_URL = "/"

const getUsersPassword = (username) => {
    http.get(`${USERS_URL}username=${username}`, (res) => {
        return res
    })
}