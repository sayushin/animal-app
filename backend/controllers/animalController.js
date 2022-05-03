const path = require('path')
const asyncHandler = require('express-async-handler')
const Animal = require('../models/animalModel')

//@desc Register an animal info
//@route POST /api/animals
//@access Public
const registerAnimal =asyncHandler(async (req,res) => {
    const {englishAnimalName,chineseAnimalName,japaneseAnimalName,difficulty}  = req.body

// Validation
    if(!englishAnimalName || !chineseAnimalName || !japaneseAnimalName || !difficulty){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if animal already exists
    // const animalExists = await Animal.findOne({englishAnimalName})

    // if(animalExists) {
    //     res.status(400)
    //     throw new Error('Animal already eixsts')
    // }

// Create animal
const animal = await Animal.create({
    chineseAnimalName,
    englishAnimalName,
    japaneseAnimalName,
    difficulty
})

if(animal) {
    res.status(200).json({
        _id:animal._id,
        chineseAnimalName:animal.chineseAnimalName,
        englishAnimalName:animal.englishAnimalName,
        japaneseAnimalName:animal.japaneseAnimalName,
        difficulty:animal.difficulty
    })
}
}
)

//@desc Get animals info
//@route GET /api/animals
//@access Public
const getAnimals =asyncHandler(async (req,res) => {

// Get animals
const animals = await Animal.find({})

if(animals) {
    res.status(200).json(animals)
}
    
res.send('Register Route')
}
)

//@desc Get animal info
//@route GET /api/animals
//@access Public
const getAnimal =asyncHandler(async (req,res) => {
    
    // Get animal
    const animal = await Animal.find({englishAnimalName:req.body.englishAnimalName})
    
    if(animal) {
        res.status(200).json(animal)
    }
        
    res.send('Register Route')
    }
    )

//@desc Delete animal info
//@route DELETE /api/animals
//@access Public
const deleteAnimal =asyncHandler(async (req,res) => {
    
    // Get animal
    const animal = Animal.findById(req.params.id)

    if(!animal){
        res.status(404)
        throw new Error('Animal not found')
    }
    
    await animal.remove()
        
    res.send('Register Route')
    }
    )

//@desc Update animal info
//@route PUT /api/animals
//@access Public
const updateAnimal =asyncHandler(async (req,res) => {

    console.log(req.body)
    
    // Update animal
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id,req.body
    )

    if(!updatedAnimal){
        res.status(404)
        throw new Error('Animal not found')
    }
        
    res.status(200).json(updatedAnimal)
    }
    )


// @desc Upload photo for animal
// @route /api/animals/:id/animalImage
// @access Public
const animalPhotoUpload = asyncHandler(async(req,res,next) => {
    const animal =await Animal.findById(req.params.id)

    if(!animal) {
        res.status(404)
        throw new Error('Animal does not exist')
    }

    if(!req.files) {
        res.status(404)
        throw new Error('Please upload a file')
    }

    console.log(req)

    const file = req.files.file

    console.log(123)
    console.log(file)
    
    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')) {
        res.status(400)
        throw new Error('Please upload an image file')
    }

    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD){
        res.status(400)
        throw new Error(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`)
    }

    // Create custom filename
    file.name = `photo_${animal._id}${path.parse(file.name).ext}`
    console.log(file.name)

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async err =>{
        if(err) {
            console.error(err)
            res.status(500)
            throw new Error(`Problem with file upload`)
        }

        await Animal.findByIdAndUpdate(req.params.id,{animalImage:file.name})

        res.status(200).json({
            success:true,
            data:file.name
        })
    })

})


module.exports = {
    registerAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    deleteAnimal,
    animalPhotoUpload
}
