import axios from "axios"
import { toast } from "react-toastify"

export const getAnimals = async () => {
      let animalsAxios = await axios.get('http://localhost:5000/api/animals/')
      return {animals:animalsAxios.data}
}

export const deleteAnimal = async (animals) => {
    const id = localStorage.getItem('animalId')
    try {
      await axios.delete(
        `http://localhost:5000/api/animals/${id}`
      )
      const deletedAnimals = animals.filter(animal => animal._id !== id)
        
      toast.success('Delete succeeded')

      return deletedAnimals
      
    } catch (error) {
      console.log(error.response)
    }
  }
