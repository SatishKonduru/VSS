const connection = require('./connection')
const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user')
const dashboardRoute = require('./routes/dashboard')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload({
    limits :{fieldSize: 200 * 1024 *1024 } //  <=200MB
}))


app.use('/user', userRoute)
app.use('/dashboard', dashboardRoute)

module.exports = app