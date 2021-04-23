import React from 'react'
// import PropTypes from 'prop-types'
import './Loader.css';


const Loader = props => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    function loader(no) {
        switch (no) {
            case 0: return (
                <div className="row-cf">
                    <div className="loader" id="loader-1"></div>
                </div>
            ); break;
            case 1: return (
                <div className="loader" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ); break;
            case 2: return (
                <div className="loader" id="loader-4">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ); break;
        }
    };
    return (
        <div className="loader-container">
            <h2 className="loader-heading">{props.name} Loading...</h2>
            {loader(getRandomInt(2))}
        </div>
    )
}

Loader.propTypes = {

}

export default Loader
