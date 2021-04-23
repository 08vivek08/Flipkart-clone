import axios from "../helpers/axios";
import { userConstants } from "./constants"

export const signup = (user) => {
    console.log(user);

    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        try {
            const res = await axios.post('/signup', {
                ...user
            });
            // console.log(res);        
            if (res.status === 201) {
                // localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: {
                        message: res.data.message
                    }
                });
            }
            else{
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: {
                    error
                }
            });
        }

    }
}