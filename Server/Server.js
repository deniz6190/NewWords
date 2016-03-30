var express = require('express')
var app = express()

app.use(express.static('../Client'))

app.listen(8080)