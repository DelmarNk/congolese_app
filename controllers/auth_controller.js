const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createUserToken, requireToken} = require('../middleware/auth')

router.post('')