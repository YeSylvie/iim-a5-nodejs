const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    email: String,
    message: String,
    created_date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Chat', chatSchema)