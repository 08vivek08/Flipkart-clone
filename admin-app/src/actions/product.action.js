import axios from "../helpers/axios";
import { productConstants } from "./constants";

const getProducts = () => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
            const res = await axios.get('getProducts');
            if (res.status === 200) {
                const { productList } = res.data;
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: {
                        products: productList
                    }
                });
            }
            else {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE, payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE, payload: {
                    error
                }
            });
        }
    }
}

export const addProduct = form => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });
            const res = await axios.post(`product/create`, form);
            console.log(res);
            if (res.status === 201) {
                const { product } = res.data;
                dispatch({
                    type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
                    payload: {
                        product
                    }
                });
                // dispatch(getProducts());
            }
            else {
                dispatch({
                    type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (err) {
            dispatch({
                type: productConstants.ADD_NEW_PRODUCT_FAILURE,
                payload: {
                    error: err
                }
            });
        }
    }
}

export { getProducts };