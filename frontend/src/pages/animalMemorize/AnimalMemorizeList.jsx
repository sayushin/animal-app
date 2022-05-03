import { useState,useEffect,useContext } from "react"
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition'
import AnimalMemorizeItem from "./AnimalMemorizeItem"
import axios from "axios"
import { toast } from "react-toastify"
import { getAnimals,deleteAnimal } from "../../context/AnimalActions"
import AnimalContext from "../../context/AnimalContext"

function AnimalMemorize() {

  const {animals,dispatch} = useContext(AnimalContext)

  const getAnimalsDispatch =  async ()=>{
    const getAnimalsResult = await getAnimals()
    console.log(getAnimalsResult)
    dispatch({type:'GET_ANIMALS',payload:getAnimalsResult.animals})
  }

  useEffect( ()=>{
    getAnimalsDispatch()
  },[])

  const [order,setOrder] = useState(0)
  const [languageMode,setLanguageMode] = useState('chinese')

  const setOrderFunc = (e) => {
    if(e.target.name==='next' && order <= animals.length-2){
      setOrder(order+1) 
    }else if(e.target.name==='prev' && order >= 1){
      setOrder(order-1) 
    }
  } 

  const handleDelete = async (animals) => {
    const deletedAnimals = await deleteAnimal(animals)
    console.log(deletedAnimals)
    dispatch({type:'GET_ANIMALS',payload:deletedAnimals})
   setOrder(order-1)
  }

  // const deleteAnimal = async () => {
  //   const id = localStorage.getItem('animalId')
  //   try {
  //     await axios.delete(
  //       `http://localhost:5000/api/animals/${id}`
  //     )
  //     const deletedAnimals =() => animals.filter(animal => animal._id !== id)

  //     dispatch({type:'GET_ANIMALS',payload:deletedAnimals})
        
  //     toast.success('Delete succeeded')
  //     // setOrder(order+1)
      
  //   } catch (error) {
  //     console.log(error.response)
  //   }
  // }



  const checkMatch = () => {
    
  }


  return (
    <div className='animalsListContainer'>
    <div className = 'animalsList'>
    {animals.map((animal,index) => {
      if(index === order){
        return (
         <AnimalMemorizeItem value={animal} languageMode={languageMode} key={animal._id} />
        )
      }
    })
    }
     </div>

     <div className="underpart-container">

<div className="under-part">
       <div className="arrow">
      <button id="left_btn" name='prev' onClick={setOrderFunc}>⬅</button> 
      
      <button className="right" id="right_btn" name='next' onClick={setOrderFunc}>⬅</button>
       </div>
      </div>

      <div className="footer-btn">
      <div className="order">
        <h2>{order+1}/{animals.length}</h2>
       </div>
       <div>      
      <button className="btn" onClick={()=>handleDelete(animals)}><i className="fas fa-trash-alt"></i></button>
       </div>
       </div>
    </div>
     </div>
     
  )
}
export default AnimalMemorize