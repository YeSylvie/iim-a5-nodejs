const Soda = require('../models/soda')

exports.createSoda = (req,res)=>{
    const sodaObject = req.body
    delete sodaObject._id;
    const s = new Soda({
        ...sodaObject
    })
    s.save()
        .then(() => res.status(201).json({message : 'Eh oui, c\'est dans la boîte!'}))
        .catch(error => res.status(400).json({ error}))
}

exports.updateSodaId =(req,res)=>{
    // const sodaObject = req.file ?{
        // ...JSON.parse(req.body.post),
        // urlImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // }: { ...req.body}; 
    Soda.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'Modification(s) : fait !'}))
        .catch(()=> res.status(400).json({ error }))
}

exports.deleteSodaId =(req,res,next)=>{
    Soda.findOne({_id:req.param.id})
        .then( post => {
            // const filename = post.urlImage.split('/images/')[1]
            // fs.unlink(`images/${filename}`,()=>{
                Soda.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message: 'ok'}))
                    .catch(error => res.status(400).json({error}))
            // })
        })
        .catch(error => res.status(500).json({error}))  
}

exports.getSodaId = (req,res)=>{
    Soda.findOne({_id:req.params.id})
        .then(soda=> res.status(200).json(soda))
        .catch(error => res.status(404).json({error}))
}

exports.getAllSodas = (req,res)=> {
    Soda.find()
        .then(sodas => res.status(200).json(sodas))
        .catch(error=> res.status(400).json({error}));
}