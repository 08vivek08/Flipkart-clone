import React from 'react'
import './style.css';

function Card(props) {
    console.log(props)
    return (
        <div className="card" {...props}>
            {props.children}
        </div>
    )
}


export default Card

