import {
    //importar aquí las actions

    //actions Navbar
    SEARCH_PLACE,
    //

} from "./actions"

const initialState = {
    places:[]
}

export default function reducer (state = initialState, action) {
    switch(action.type){
        case SEARCH_PLACE:
            return {
                ...state,
                places: action.payload
            }
        default:
            return state;
    }
}