import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
            const res = await axios.get(`products/${slug}`);
            console.log(res);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (err) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                payload: {
                    error: err
                }
            });
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            console.log(payload);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            const res = await axios.get(`/page/${cid}/${type}`);
            // console.log(res);
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error: error}
                });
            }
        }
        catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                payload: { error: error }
            });
        }
    }
}