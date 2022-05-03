import { createContext,useReducer } from "react";
import animalReducer from "./AnimalReducer"

const AnimalContext = createContext()

export const AnimalProvider = ({children}) => {
    const initialState= {
        animals:[],
        order:0,
        lang:'',
        isCircleLoading:false
    }

const [state,dispatch] = useReducer(animalReducer,initialState)

return <AnimalContext.Provider
value={{
    ...state,
    dispatch
}}>
    {children}
</AnimalContext.Provider>

}

export default AnimalContext
