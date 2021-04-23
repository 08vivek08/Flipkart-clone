import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    // loading: false,
    error: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                // loading: false,
                error: null,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                // loading: false,
                error: null,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                // loading: false,
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                error: null,
                // loading: false,
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:
            const pro = [action.payload.product, ...state.products];
            state = {
                ...state,
                products: pro,
                error: null,
                // loading: true,
            };
            break;
        case productConstants.ADD_NEW_PRODUCT_FAILURE:
            state = {
                ...state,
                // loading: false,
                error: action.payload.error,
            };
            break;
        default:
            state = {
                ...state
            }
            break;
    }
    return state;
}

export default productReducer;