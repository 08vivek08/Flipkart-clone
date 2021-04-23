import React from 'react';
// import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import store from '../store';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = window.localStorage.getItem('token');
    return (
        <Route {...rest} component={(props) => {
            if (token) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={'/signin'} />
            }
        }} />
    )
}

// PrivateRoute.propTypes = {

// }

export default PrivateRoute
