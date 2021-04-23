import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

const getAllCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
            });
            const res = await axios.get('category/getCategory');
            if (res.status === 200) {
                console.log(res);
                const { categoryList } = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: {
                        categories: categoryList
                    }
                });
            }
            else {
                // console.log(`error`);
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
        catch (err) {
            // console.log(`error`);
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: err
                }
            });
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        try {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
            });
            const res = await axios.post('/category/create', form);
            console.log(res);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: {
                        category: res.data.category
                    }
                });
            }
            else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (err) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {
                    error: err
                }
            });
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        try {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_REQUEST
            });
            const res = await axios.put('/category/update', form);
            // console.log(res);
            if (res.status === 201) {
                dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
                dispatch(getAllCategory());
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                    payload: {
                        error: error
                    }
                });
            }
        }
        catch (err) {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {
                    error: err
                }
            })
        }
    }
}
export const deleteCategories = (ids) => {
    return async dispatch => {
        try {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_REQUEST
            });
            const res = await axios.post('/category/delete', {
                payload: {
                    ids
                }
            });
            // console.log(res);
            if (res.status === 200) {
                dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
                dispatch(getAllCategory());
            }
            else {
                dispatch({
                    type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (err) {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: {
                    error: err
                }
            });
        }
    }
}

export { getAllCategory };