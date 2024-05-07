const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {Error} = require('mongoose')

if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
}

const secret = process.env.JWT_SECRET
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const verify = async(jwt_payload, done)=>{
    try{
        const user = await User.findById(jwt_payload.id)
        return done(null,user)
    } catch(error){
        return done(error)
    }
}

const strategy = new Strategy(options, verify)
passport.use(strategy)
passport.initialize()

const handleValidateOwner = (req,doc)=>{
    const userId = doc.user._id
    if(!req.user._id == userId){
        throw new Error('Unauthorized Access')
    }
    return doc
}

const requireToken = passport.authenticate('jwt', {session: false})

const createUserToken = (req,user)=>{
    if(!user || !req.body.password || bcrypt.compareSync(user.password,req.body.password)){
        const error = new Error('Username or Password is not correct')
        error.statuscode = 422
        throw error
    }
    return jwt.sign({id: user._id}, secret, {expiresIn: 1000*60*60*24*7*4})
}

module.exports = {
    createUserToken,
    requireToken,
    handleValidateOwner
}

