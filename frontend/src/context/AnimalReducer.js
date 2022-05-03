const animalReducer =(state,action) => {
    switch(action.type) {
        case 'GET_ANIMALS':
            return{
                ...state,
                animals:action.payload
            }
        case 'CHANGE_LANG':
            return {
                ...state,
                lang:action.payload,
                order:0
            }
        case 'DELETE_ANIMAL':
            return{
                ...state,
                animals:action.payload
            }
    }
}

export default animalReducer