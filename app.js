const bodyParser = require("body-parser")
const express = require("express")
const fs = require('fs');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./controller/Route')
app.use('/', routes)

app.listen(3113, () => {
    console.log("listeniing at port:3113")
}) 