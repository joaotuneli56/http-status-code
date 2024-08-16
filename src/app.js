const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//criar rotas
const index = require('./routes/index')

app.use('/', index)
module.exports = app;



