import axios from "axios";

export const SEARCH_PLACE = "SEARCH_PLACE";
export const GET_PLACE_DETAIL = "GET_PLACE_DETAIL";
export const GET_PLACES = "GET_PLACES";
export const BOOK_DETAIL = "BOOK_DETAIL";
export const GET_USER = "GET_USER";



export const getPlaces = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/local`);
        return dispatch({
            type: GET_PLACES,
            payload: data
        })
    }
}

export const getPlaceDetail = (id) => {
    return async (dispatch) => {

        try {
            const { data } = await axios.get(`/local/${id}`);
            console.log(data);
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
            const { data } = await axios.get(`/local?name=${input}`);
            dispatch({
                type: SEARCH_PLACE,
                payload: data
            })
        } catch (error) {
            return error;
        }
    }
}



export const bookDetail = (idBook) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/local/${idBook}`);
        return dispatch({
            type: BOOK_DETAIL,
            payload: data
        })
    }
}

export const getUser = (idUser) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user/${idUser}`);
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}

export const updateUser = (user) => {
    return async () => {
        const { data } = await axios.put(`/user`, user);
        return data;
    }
}

export const deleteUser = (idUser) => {
    return async () => {
        const { data } = await axios.delete(`/user/${idUser}`, idUser);
        return data;
    }
}

export const createUser = (user) => {
    return async () => {
        const { data } = await axios.post(`/user`, user);
        return data;
    }
}

export const createPlace = (place) => {
    return async () => {
        const { data } = await axios.post(`/local`, place);
        return data;
    }
}

export const createBook = (book) => {
    return async () => {
        const { data } = await axios.post(`/book`, book);
        return data;
    }
}


export const updatePlace = (idPlace, update) => {
    return async () => {
        const { data } = await axios.put(`/local/${idPlace}`, update);
        return data;
    }
}

export const updateBook = (idBook, update) => {
    return async () => {
        const { data } = await axios.put(`/local/${idBook}`, update);
        return data;
    }
}

export const deleteBook = (idBook, update) => {
    return async () => {
        const { data } = await axios.delete(`/local/${idBook}`, update);
        return data;
    }
}

export const disablePlace = (idPlace, status) => {
    return async () => {
        const { data } = await axios.put(`/local/${idPlace}`, status);
        return data;
    }
}

