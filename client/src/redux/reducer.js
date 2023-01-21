import {
    
    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
    FILTER_CATEGORY,
    GET_USER,
    GET_USER_BY_ID,
    LOGOUT,
    SET_INPUT,
    SORT_RATING
   
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

        case FILTER_CATEGORY:

            const filteredplaces = action.payload === "all" ? state.allPlaces 
            :
            state.allPlaces.filter(p => p.category === action.payload)
            
            return {
                ...state,
                places: filteredplaces, 
            }


            case SORT_RATING:
                let order = state.places
                console.log(order)
                if(action.payload === 'asc'){
                    order = order.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (b.rating > a.rating) {
                            return -1;
                        }
                        return 0
                    })
                }
                if(action.payload === "dec"){
                    order = order.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        if (b.rating > a.rating) {
                            return 1;
                        }
                        return 0
                    })
                }
    
                return {
                    ...state,
                    places: order
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