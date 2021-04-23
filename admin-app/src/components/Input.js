import React from 'react';
// import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Input(props) {
    return (
        <Form.Group>
            { (props.label) ?
                <Form.Label>{props.label}</Form.Label>
                :
                null
            }
            {/* {console.log(props)} */}
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required={props.required ? props.required : false}
                readOnly={props.readOnly}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )
}

Input.propTypes = {

}

export default Input

