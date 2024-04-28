const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT
const events_controller = require('./controllers/events_controller')
const auth_controller = require('./controllers/auth_controller')

if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.json())
require('./db.connection')
app.use(cors())
app.use('/event', events_controller)
app.use('/auth', auth_controller)

app.get('/', (req,res)=>{
    res.status(200).send('hi there')
})

app.listen(PORT,()=>{
    console.log(`Now listening on PORT ${PORT}`)
})