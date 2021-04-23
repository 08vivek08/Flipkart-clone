import { pageConstants } from "../actions/constants"

const initState = {
    error: null,
    // loading: false,
    page: {}
};

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_NEW_PAGE_REQUEST:
            state = {
                ...state,
                // loading: true,
                error: null,
            }
            break;
        case pageConstants.CREATE_NEW_PAGE_SUCCESS:
            state = {
                ...state,
                // loading: false,
                page: action.payload.page,
                error: null,
            }
            break;
        case pageConstants.CREATE_NEW_PAGE_FAILURE:
            state = {
                ...state,
                // loading: false,
                error: action.payload.error,
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state
}


export default pageReducer;