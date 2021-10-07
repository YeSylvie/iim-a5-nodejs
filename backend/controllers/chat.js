const chat = require('../models/chat');
const Chat = require('../models/chat')

/* GET ALL CHATS */
exports.getAllMessages = (req,res)=> {
    Chat.find()
        .then(chats => res.status(200).json(chats))
        .catch(error=> res.status(400).json({error}));
}


/* SAVE CHAT */
exports.createMessage = (req,res)=> {
    const chatObject = req.body
    delete chatObject._id;
    const c = new Chat({
        ...chatObject
    })
    c.save()
        .then(() => res.status(201).json({message : 'On save le msg !'}))
        .catch(error => res.status(400).json({ error}))
}