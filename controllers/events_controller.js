const express = require('express')
const router = express.Router()
const events = require('../models/Events')

//get route
router.get('/', async(req,res)=>{
    try{
        const events = await events.find({})
        res.status(200).json(events)
    } catch(error){
        res.status(400)(error)
    }
})

//create route
router.post('/', async(req,res)=>{
    try{
        const event = await events.create(req.body)
        res.status(201).json(events)
    } catch(error){
        res.statut(400)(error)
    }
})

//show route
router.get('/:id', async (req,res)=>{
    try{
        const event = await events.findById(req.params.id)
        res.status(201).json(event)
    } catch(error){
        res.statut(400)(error)}
})

//delete route
router.delete('/:id', async(req,res)=>{
    try{
        const deletedEvent = await events.findByIdAndDelete(req.params.id)
        res.status(201).json(events)
    } catch(error){
        res.statut(400)(error)}
})

//update route
router.put('/:id', async(req,res)=>{
    try{
        const newEvent = await events.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.staut(200).json(events)
    } catch(error){
        res.statut(400)(error)}
})