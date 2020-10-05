const express = require('express');
const app = express();
const router = require('./routes')

app.use('/Login', router)

function errHandler(err, req, res, next) {
    if (err) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);
app.listen(666, () => {
    console.log("server up and running");
})