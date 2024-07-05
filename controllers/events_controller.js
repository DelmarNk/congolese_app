const express = require('express')
const router = express.Router()
const Events = require('../models/Events')

//get route
router.get('/', async(req,res)=>{
    try{
        const events = await Events.find({})
        res.status(200).json(events)
    } catch(error){
        res.status(400).json(error)
    }
})

//create route
router.post('/', async(req,res)=>{
    try{
        const event = await Events.create(req.body)
        res.status(201).json(event)
    } catch(error){
        res.status(400).json(error)
    }
}) 

//show route
router.get('/:id', async (req,res)=>{
    try{
        const event = await Events.findById(req.params.id).populate('attendees')
        res.status(201).json(event)
    } catch(error){
        res.status(400).json(error)}
})

//delete route
router.delete('/:id', async(req,res)=>{
    try{
        const deletedEvent = await Events.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedEvent)
    } catch(error){
        res.status(400).json(error)}
})

//update route
router.put('/:id', async(req,res)=>{
    try{
        const newEvent = await Events.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(newEvent)
    } catch(error){
        res.status(400).json(error)}
})

module.exports = router