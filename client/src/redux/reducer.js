import {
    
    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
    FILTER_CATEGORY,
    GET_USER,
    GET_USER_BY_ID,
    LOGOUT,
   
} from "./actions"


const initialState = {
    places:[],
    allPlaces: [],
    placeDetail: {},
    profile: {},
    allUsers: [],
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
                places: action.payload,
            }

        case FILTER_CATEGORY:
            // let filterCategory = []
            console.log(action.payload)
            let lugaresfiltrados = state.allPlaces.filter(lugar => action.payload.includes(lugar.category))

            // action.paylodoad.map(category => category === state.allPlaces.category)
            // if(action.payload === 'bar'){
            //     let filter = state.allPlaces.filter(place =>place.category === "bar")
            //     filterCategory.push(filter)
            // }
            // if(action.payload === "pub"){
            //     let filter =  state.allPlaces.filter( place => place.category === "pub")
            //     filterCategory.push(filter)
            // }
            // if(action.payload === 'disco'){
            //     let filter = state.allPlaces.filter(place => place.category === "disco")
            //     filterCategory.push(filter)

            
            return {
                ...state,
                places: lugaresfiltrados 
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