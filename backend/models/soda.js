const mongoose = require('mongoose')

const sodaSchema = mongoose.Schema({

    name: {type: String, required:true},
    description:{type: String, required:true}
    // urlImage:{type: String, required:false}
})

module.exports = mongoose.model('Soda', sodaSchema)