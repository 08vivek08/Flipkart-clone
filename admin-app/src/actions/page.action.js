import axios from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
    return async dispatch => {
        try {
            dispatch({ type: pageConstants.CREATE_NEW_PAGE_REQUEST });
            const res = await axios.post('/page/create', form);
            console.log(res);
            if (res.status === 201) {
                const { page } = res.data
                dispatch({
                    type: pageConstants.CREATE_NEW_PAGE_SUCCESS,
                    payload: {
                        page: page
                    }
                });
            }
            else {
                dispatch({
                    type: pageConstants.CREATE_NEW_PAGE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: pageConstants.CREATE_NEW_PAGE_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
}