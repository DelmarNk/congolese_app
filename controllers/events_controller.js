const express = require('express')
const router = express.Router()
const events = require('../models/Events')

//get route
router.get('/', async(req,res)=>{
    try{
        const event = await events.find({})
        res.status(200).json(event)
    } catch(error){
        res.status(400)(error)
    }
})


