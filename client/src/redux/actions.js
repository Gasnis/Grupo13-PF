import axios from "axios";

export const SEARCH_PLACE = "SEARCH_PLACE";
export const GET_PLACE_DETAIL = "GET_PLACE_DETAIL";



export const getPlaceDetail = (id) => {
    return async (dispatch) => {
        const response = await axios(`/place/${parseInt(id)}`)
        const placeDetail = response.data;
        dispatch({
            type: GET_PLACE_DETAIL,
            payload: placeDetail
        })
    }
}

export const searchPlace = (input) => {
    return async (dispatch) => {
        const response = await axios(`/places?name=${input}`);
        const searchResult = response.data;
        dispatch({
            type: SEARCH_PLACE,
            payload: searchResult
        })
    }
}