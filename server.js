const express = require('express')
require('dotenv').config()
require('./db.connection')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT

if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(cors())


app.listen(PORT,()=>{
    console.log(`Now listening on PORT ${PORT}`)
})