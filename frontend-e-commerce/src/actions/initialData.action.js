import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
import { productConstants } from "./constants";

export const getInitialData = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/initialdata');
            if (res.status === 200) {
                console.log(res);
                const { categoryList, productList } = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: {
                        categories: categoryList
                    }
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: {
                        products: productList
                    }
                });
            }
            else {
                console.log(res);
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}