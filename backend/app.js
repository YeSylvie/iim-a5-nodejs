const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/post')
const port = 3000
const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user')
const sodaRoutes = require('./routes/soda')
const path = require('path')
// Pour se connecter à mangodb
mongoose.connect('mongodb+srv://sylvie:nodejsa5@nodejs-a5.5a86q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(()=> console.log("db error"))
/*
app.use('/',(req, res,next) =>{
    res.json({message: "oklm"})
})*/

// Middleware
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))
// Les différents routes
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/test',testRoutes)
app.use('/user',userRoutes)
app.use('/sodas',sodaRoutes)

module.exports = app