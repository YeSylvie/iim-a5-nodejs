const express = require('express')
const router = express.Router()
const chatController = require('./../controllers/chat')
const auth = require('../middleware/auth')

console.log("soda route")
router.post('/',auth,chatController.createMessage)
router.get('/',auth,chatController.getAllMessages)

module.exports = router