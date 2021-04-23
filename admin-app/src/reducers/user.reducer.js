import { userConstants } from '../actions/constants';

const initState = {
    error: null,
    message: '',
    // loading: false
};


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                error: null,
                // loading: true,
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                // loading: false,
                message: action.payload.message,
                error: null,
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
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

export default userReducer;