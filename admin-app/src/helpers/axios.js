import axios from 'axios';
import { authConstants } from '../actions/constants';
import store from '../store';
import { api } from '../urlConfig';

let token = '';

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': (token ? `Bearer ${token}` : '')
    }
});

axiosInstance.interceptors.request.use(req => {
    const { auth } = store.getState();
    if (auth.token) {
        token = auth.token;
        window.localStorage.setItem('token', token);
    }
    else if (window.localStorage.getItem('token')) {
        token = window.localStorage.getItem('token');
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    if (error.response) {
        const { status } = error.response;
        if (status === 511) {
            console.log('error 511 logout');
            window.localStorage.clear();
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }
    }
    else {
        console.log('SERVER DOWN');
        store.dispatch({ type: authConstants.SERVER_FAILURE });
    }
});

export default axiosInstance;