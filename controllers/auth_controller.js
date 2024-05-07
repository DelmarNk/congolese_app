const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createUserToken, requireToken} = require('../middleware/auth')

router.post('/register', async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        req.body.password = passwordHash
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch(error){
        res.status(400).json(error)
    }
})

router.post('/login', async(req,res)=>{
    try{
        const loggingUser = req.body.username
        const foundUser = await User.findOne({username: loggingUser})
        const token = await createUserToken(req, foundUser)
        res.status(200).json({user: foundUser, isLoggedIn: true, token})
    } catch(error){
        res.status(400).json(error.message)
    }
})

router.get('/user/:id', requireToken, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(201).json({id: user._id, username: user.username})
    } catch(error){
        res.status(400).json(error)
    }
})

router.put('/user/update/:id', requireToken, async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json(user)
    } catch(error){
        res.status(400).json(error)
    }
})

router.delete('/user/delete/:id', requireToken, async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    } catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = router