const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const multer = require('multer')
const upload = multer({dest:'../public/uploads/'})

const {registerAnimal,getAnimals,getAnimal,updateAnimal,deleteAnimal,animalPhotoUpload} = require('../controllers/animalController')

router.route('/').post(registerAnimal).get(getAnimals)

router.get('/search',getAnimal)

router.put('/:id/animalImage',upload.single('file'),animalPhotoUpload)

router.route('/:id').delete(deleteAnimal).put(updateAnimal)

module.exports = router 
