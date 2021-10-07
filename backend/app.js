const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const userRoutes = require('./routes/user')
const sodaRoutes = require('./routes/soda')
const chatRoutes = require('./routes/chat')
const path = require('path')
const server = app.listen(3000)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});
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

// socket io
io.on('connection', function (socket) {
    console.log(`User connected ${socket.id}`);
    socket.on('disconnect', function() {
      console.log(`User disconnected ${socket.id}`);
    });

    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});

// Les différents routes
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/user',userRoutes)
app.use('/sodas',sodaRoutes)
app.use('/chatroom', chatRoutes)
module.exports = app