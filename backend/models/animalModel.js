const mongoose = require('mongoose')

const animalSchema = 
mongoose.Schema({
    chineseAnimalName:{
        type:String,
        required:[true,'Please add a Chinese name']
    },
    englishAnimalName:{
        type:String,
        required:[true,'Please add a English name']
    },
    japaneseAnimalName:{
        type:String,
        required:[true,'Please add a Japanese name']
    },
    animalImage:{
        type:String,
        default:'nophoto.png'
    },
    difficulty:{
        type:String,
        required:[true,'Please add a difficulty']
    }
},
{
    timestamps:true
}

)

module.exports = mongoose.model('Animal',animalSchema)