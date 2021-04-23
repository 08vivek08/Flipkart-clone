import axios from "../helpers/axios";
import { authConstants } from "./constants"

export const login = (user) => {

    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });
            const res = await axios.post('/admin/signin', {
                ...user
            });
            if (res.status === 200) {
                console.log('cookie', res.cookies);
                const { token, user } = res.data;
                window.localStorage.setItem('user', JSON.stringify(user));
                window.localStorage.setItem('token', token);
                console.log(res);
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
            else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('Refresh');
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }
    }
}

export const signout = () => {

    return async dispatch => {
        try {
            dispatch({ type: authConstants.LOGOUT_REQUEST });
            const res = await axios.post('/admin/signout');
            console.log(res);
            if (res.status === 200) {
                const { message } = res.data;
                console.log(message);
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                });
            }
            else {
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error
                }
            });
        }
        finally {
            window.localStorage.clear();
        }
    }
}