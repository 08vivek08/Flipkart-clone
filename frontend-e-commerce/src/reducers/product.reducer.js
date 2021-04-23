import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    },
    pageRequest: false,
    page: {},
    loading: true,
    error: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
            state = {
                ...state,
                // loading: true,
                error: null,
            }
            break;
        case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: { ...action.payload.productsByPrice },
                // loading: false,
                error: null,
            }
            break;
        case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                // loading: false,
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                // loading:true
                pageRequest: true,
                error: null,
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                // loading:false,
                pageRequest:false,
                page: action.payload.page,
                error: null,
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                // loading:false,
                pageRequest: false,
                error: action.payload.error
            }
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