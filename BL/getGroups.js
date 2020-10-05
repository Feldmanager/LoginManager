const http = require('http')

const GROUPS_URL = "/"

const getUsersGroups = (username) => {
    http.get(`${GROUPS_URL}username=${username}`, (res) => {
        return res
    })
}