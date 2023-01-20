import {
    
    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
    FILTER_PLACES,
    GET_USER,
    GET_USER_BY_ID,
    LOGOUT,
    SET_INPUT
   
} from "./actions"


const initialState = {
    places:[],
    allPlaces: [],
    placeDetail: {},
    profile: {},
    allUsers: [],
    searchInput: "",
}

export default function reducer (state = initialState, action) {
    switch(action.type){
        case SET_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        case GET_PLACES:
            return{
                ...state,
                places: action.payload,
                allPlaces: action.payload,
            }
        case SEARCH_PLACE:
            return {
                ...state,
                places: action.payload,
            }
        case FILTER_PLACES:
            return {
                ...state,
                places: action.payload,
            }

        case GET_PLACE_DETAIL:
            return {
                ...state,
                placeDetail: action.payload
            }
        case GET_USER:
            return {
                ...state,
                allUsers: action.payload
            }
        
        case GET_USER_BY_ID:
            return {
                ...state,
                profile: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                profile: {}
            }
        
        default:
            return state;
    }
}