import axios from "axios";

export const SEARCH_PLACE = "SEARCH_PLACE";
export const GET_PLACE_DETAIL = "GET_PLACE_DETAIL";
export const GET_PLACES = "GET_PLACES";
export const BOOK_DETAIL = "BOOK_DETAIL";
export const GET_USER = "GET_USER";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const SORT_RATING ='SORT_RATING'
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const LOGOUT = "LOGOUT";
export const SET_INPUT = "SET_INPUT";
export const SET_CHECKED = "SET_CHECKED";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const BOOK_PERSIST = "BOOK_PERSIST"
export const SEARCH_USER = "SEARCH_USER"


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
            console.log(id)
            const { data } = await axios.get(`/local/${id}`);
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
            dispatch({
                type: SEARCH_PLACE,
                payload: []
            })
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

export const getUser = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user`);
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}
export const searchUser = (input) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/user?name=${input}`);
            dispatch({
                type: SEARCH_USER,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: SEARCH_USER,
                payload: []
            })
        }
    }
}

export const getUserByid = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user/${id}`);
        return dispatch({
            type: GET_USER_BY_ID,
            payload: data
        })
    }
}

export const updateUser = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/user`, user);
            return dispatch ({
                type: GET_USER_BY_ID,
                payload: data
            });
        } catch (error) {
            return error
        }
    }
}

export const deleteUser = (id) => {
    return async () => {
        const { data } = await axios.delete(`/user/${id}`, id);
        return data;
    }
}

export const createUser = (user) => {
    return async () => {
        try{
            const { data } = await axios.post(`/user`, user);
            return data;
        } catch(error) {
            return error
        }
    }
}

export const createPlace = (place) => {
    return async () => {
        try {
            const { data } = await axios.post(`/local`, place);
            return data;
        } catch(error) {
            return error;
        }
    }
}

export const createBook = (book) => {
    return async () => {
        try{
            const { data } = await axios.post(`/book`, book);
            return data;
        }catch(error){
            return error;
        }
    }
}


export const deletePlace = (id) => {
    return async () =>{
        const { data } = await axios.delete(`/local/${id}`, id);
        return data
    }
}

export const updatePlace = (update) => {
    return async () => {
        const { data } = await axios.put(`/local`, update);
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


export const filterCategory = (payload) => {

    return {
        type: "FILTER_CATEGORY",
        payload
    }

}

export const sortRating = (payload) => {

    return {
        type: "SORT_RATING",
        payload
    }

}

export const setInput = (payload) => {
    return {
        type: "SET_INPUT",
        payload
    }
}

export const setChecked = (payload) => {
    return {
        type: "SET_CHECKED",
        payload
    }
}


export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const cleanDetail = () => {

    return {
        type: "CLEAN_DETAIL"
    }


    

}
export const bookPersist = (payload) => {

    return {
        type: "BOOK_PERSIST",
        payload
    }


    

}

export const setFilter = (payload) => {

    return {
        type: "SET_FILTER",
        payload
    }

}






//aceptar bar
//no aceptar bar
//banear usuario