const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const bd = require("body-parser")
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
dotenv.config({ path: './config/config.env' })
require('./config/db')
app.use(bd.urlencoded({
    extended:false
}))
app.use(bd.json())

// Route
app.use('/api/v1/', require('./routes/keyword/suggest')) //suggesties
app.use('/api/v1/', require('./routes/keyword/pagesused')) //pagina's used
app.use('/api/v1/', require('./routes/keyword/instarelated')) //instarelated (werkt momentele niet)
app.use('/api/v1/', require('./routes/domain/report')) // audit
app.use('/api/v1/', require('./routes/domain/domainkeyword')) // domein keyword
app.use('/api/v1/', require('./routes/domain/subdomains')) // subdomeinen
app.use('/api/v1/', require('./routes/auth/register')) // registreren
app.use('/api/v1/', require('./routes/auth/login')) // login | user auth | historie

// De port van het proces
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`SERVER RUNNING AT PORT ${PORT}`))

module.exports = app