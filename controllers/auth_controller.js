const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createUserToken, requireToken} = require('../middleware/auth')

router.post('/register', async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(12)
        const passwordHarsh = await bcrypt.harsh(req.body.password, salt)
        req.body.password = passwordHarsh
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch(error){
        res.status(400).json(error)
    }
})