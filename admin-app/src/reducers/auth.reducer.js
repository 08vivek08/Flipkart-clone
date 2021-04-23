import { authConstants } from '../actions/constants';

const initState = {
    token: null,
    error: null,
    user: {
        fullName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    // loading: false,
    message: ''
};

const authReducer = (state = initState, action) => {
    // console.log(action);

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                error:null
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                error: null
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                error: null
                // loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                error: null
                // message: action.payload.message
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                // loading: false
            }
            break;
        case authConstants.SERVER_FAILURE:
            state = {
                ...state,
                error: 503,
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

export default authReducer;