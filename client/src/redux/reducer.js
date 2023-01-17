import {
    
    SEARCH_PLACE,
    GET_PLACES,
   
} from "./actions"


const initialState = {
    places:[],
    allPlaces: [],
}

export default function reducer (state = initialState, action) {
    switch(action.type){
    
        case GET_PLACES:
            return{
                ...state,
                places: action.payload,
                allPlaces: action.payload,
            }
        case SEARCH_PLACE:
            return {
                ...state,
                places: action.payload
            }
        
        
        default:
            return state;
    }
}