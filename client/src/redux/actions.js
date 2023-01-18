import axios from "axios";

export const SEARCH_PLACE = "SEARCH_PLACE";
export const GET_PLACE_DETAIL = "GET_PLACE_DETAIL";
export const GET_PLACES = "GET_PLACES";
export const BOOK_DETAIL = "BOOK_DETAIL";
export const GET_USER = "GET_USER";



export const getPlaceDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/place/${id}`);
            dispatch({
                type: GET_PLACE_DETAIL,
                payload: data
            })
        }
        catch (error) {
            return error;
        }
    }
}

export const searchPlace = (input) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/places?name=${input}`);
            dispatch({
                type: SEARCH_PLACE,
                payload: data
            })
        } catch (error) {
            return error;
        }
    }
}

export const getPlaces = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/places`);
        dispatch({
            type: GET_PLACES,
            payload: data
        })
    }
}


export const bookDetail = (idBook) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/place/${idBook}`);
        return dispatch({
            type: BOOK_DETAIL,
            payload: data
        })
    }
}

export const getUser = (idUser) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/place/${idUser}`);
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}

export const updateUser = (user) => {
    return async () => {
        const { data } = await axios.put(`/users`, user);
        return data;
    }
}

export const deleteUser = (idUser) => {
    return async () => {
        const { data } = await axios.delete(`/users${idUser}`, idUser);
        return data;
    }
}

export const createUser = (user) => {
    return async () => {
        const { data } = await axios.post(`/create-user`, user);
        return data;
    }
}

export const createPlace = (place) => {
    return async () => {
        const { data } = await axios.post(`/create-place`, place);
        return data;
    }
}

export const createBook = (book) => {
    return async () => {
        const { data } = await axios.post(`/create-book`, book);
        return data;
    }
}


export const updatePlace = (idPlace, update) => {
    return async () => {
        const { data } = await axios.put(`/place/${idPlace}`, update);
        return data;
    }
}

export const updateBook = (idBook, update) => {
    return async () => {
        const { data } = await axios.put(`/place/${idBook}`, update);
        return data;
    }
}

export const deleteBook = (idBook, update) => {
    return async () => {
        const { data } = await axios.delete(`/place/${idBook}`, update);
        return data;
    }
}

export const disablePlace = (idPlace, status) => {
    return async () => {
        const { data } = await axios.put(`/place/${idPlace}`, status);
        return data;
    }
}

