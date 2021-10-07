const Soda = require('../models/soda')

exports.createSoda = (req,res)=>{
    console.log("Je crée mes sodas !!")
    const sodaObject = req.body
    delete sodaObject._id;
    const s = new Soda({
        ...sodaObject
    })
    s.save()
        .then(() => res.status(201).json({message : 'Eh oui, c\'est dans la boîte!'}))
        .catch(error => res.status(400).json({ error}))
}

exports.getSodaId = (req,res)=>{
    console.log('Je veux ce soda là.')
    Soda.findOne({_id:req.params.id})
        .then(soda=> res.status(200).json(soda))
        .catch(error => res.status(404).json({error}))
}

exports.getAllSodas = (req,res)=> {
    console.log('Je veux tout moi !')
    Soda.find()
        .then(sodas => res.status(200).json(sodas))
        .catch(error=> res.status(400).json({error}));
}