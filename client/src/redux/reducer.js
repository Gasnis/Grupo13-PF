import {
    
    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
   
} from "./actions"


const initialState = {
    places:[],
    allPlaces: [],
    placeDetail: null,
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
        case GET_PLACE_DETAIL:
            return {
                ...state,
                placeDetail: action.payload
            }
        
        default:
            return state;
    }
}