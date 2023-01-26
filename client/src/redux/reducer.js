import {

    SEARCH_PLACE,
    GET_PLACE_DETAIL,
    GET_PLACES,
    FILTER_CATEGORY,
    GET_USER,
    GET_USER_BY_ID,
    LOGOUT,
    SET_INPUT,
    SORT_RATING,
    SET_CHECKED,
    CLEAN_DETAIL,

} from "./actions"


const initialState = {
    places: [],
    allPlaces: [],
    placeDetail: {},
    profile: {},
    allUsers: [],
    searchInput: "",
    darkmode: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        case GET_PLACES:
            return {
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

            if (action.payload === "best") {
                order = order.sort(function (place1, place2) {
                    if (place1.rating > place2.rating) {
                        return -1;
                    }
                    if (place2.rating > place1.rating) {
                        return 1;
                    }
                    return 0

                })

            }
            if (action.payload === "worst") {
                order = order.sort(function (place1, place2) {
                    if (place1.rating > place2.rating) {
                        return 1;

                    }
                    if (place2.rating > place1.rating) {
                        return -1;
                    }
                    return 0
                })

            }

            return {
                ...state,
                places: order,
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
        case CLEAN_DETAIL:
            return {
                ...state,
                placeDetail: {}
            }
        case SET_CHECKED:
            let checkstate

            action.payload === true ? checkstate = false : checkstate = true
            return {
                ...state,
                darkmode: checkstate,
            }

        default:
            return state;
    }
}