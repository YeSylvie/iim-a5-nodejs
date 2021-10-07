const express = require('express')
const router = express.Router()
const sodaController = require('./../controllers/soda')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

console.log("soda route")
router.post('/',auth,sodaController.createSoda)
router.put('/:id',auth,sodaController.updateSodaId)
router.delete('/:id',auth,sodaController.deleteSodaId)
router.get('/:id',sodaController.getSodaId)
router.get('/',sodaController.getAllSodas)

module.exports = router