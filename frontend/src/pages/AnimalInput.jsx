import { useState } from "react"
import axios from 'axios'
import * as FormData from 'form-data'
import { toast } from "react-toastify"

function AnimalInput() {

    const [animalInfo, setAnimalInfo] = useState({
        englishAnimalName:'',
        chineseAnimalName:'',
        japaneseAnimalName:'',
        difficulty:''
})

const {englishAnimalName,chineseAnimalName,japaneseAnimalName} = animalInfo

    const onChange = (e) => {
        setAnimalInfo((prevState)=>(
        {...prevState,
        [e.target.name]:e.target.value 
        }))
    }
    
    const ANIMAL_URL = '/api/animals/'

    const animal = axios.create({
        baseURL:ANIMAL_URL,
        headers:{
            'Content-Type':'application/json'
        }
    })
    const animalImageUpload = axios.create({
        baseURL:ANIMAL_URL,
        // 'Accept':'*/*'
    })

    const onSubmit =　async (e) => {
        e.preventDefault()
        const animalImage = document.getElementById('animalImage').files[0]
      let file = new FormData()
      file.append('file',animalImage)

      // Display the key/value pairs
      for(let pair of file.entries()) {
          console.log(pair[0]+','+pair[1])
      }

        try {
            const response = await animal.post('',animalInfo)
            console.log(response)
            const id = response.data._id
            const dataUpload = await animalImageUpload.put(`${id}/animalImage`,file)

console.log(dataUpload)
setAnimalInfo(state => ({...state,
    englishAnimalName:'',
chineseAnimalName:'',
japaneseAnimalName:''}))
document.getElementById('animalImage').value = ''

toast.success('Succeeded to upload')
    
        } catch (error) {
            console.log(error.response)
            toast.error('Failed to upload')
        }


    }

  return (
    <>
    <div className="container">
    <div className="flex-column">
    <h2>Input Animal Infomation</h2>
    <form>
    <label>English Name</label>
        <div className="input-group">
       <input type="text" name="englishAnimalName" value={englishAnimalName} onChange={onChange} />
        </div>
        <label>Chinese Name</label>
        <div className="input-group">
       <input type="text"  name="chineseAnimalName" value={chineseAnimalName} onChange={onChange} />
        </div>
        <label htmlFor="">Japanese Name</label>
        <div className="input-group">
       <input type="text"  name="japaneseAnimalName" value={japaneseAnimalName} onChange={onChange} />
        </div>
        <label>Animal Image</label>
        <div className="input-group">
       <input type="file" name="animalImage" id="animalImage" />
        </div>
        <div className="radio">
        <div>
       <input type="radio" name="difficulty" value="easy" onClick={onChange}　/>
       <label>Easy</label>
        </div>
        <div>
       <input type="radio" name="difficulty" value="middle" onClick={onChange} />
       <label>Middle</label>
        </div>
        <div>
       <input type="radio" name="difficulty" value="hard" onClick={onChange} />
       <label>Hard</label>
        </div>
        </div>
        <div className="input-group">
            <input type="submit" className=" btn-block" value="Submit" onClick={onSubmit} />
        </div>
    </form>
    </div>
    </div>
    
    
    
    </>
  )
}
export default AnimalInput