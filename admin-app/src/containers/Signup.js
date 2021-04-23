import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup } from '../actions';


function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(

    const dispatch = useDispatch();
    const userSignup = (e) => {
        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user));
    }

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);


    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    if (user.loading) {
        return <Loader />
    }
    if (user.message) {
        alert(user.message);
        return <Redirect to={'/signin'} />
    }


    return (
        <div>
            <Layout>
                <Container>
                    {user.message}
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label="First Name"
                                            placeholder="First Name"
                                            value={firstName}
                                            type="text"
                                            required={true}
                                            onChange={(e) => { setFirstName(e.target.value) }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label="Last Name"
                                            placeholder="Last Name"
                                            value={lastName}
                                            type="text"
                                            onChange={(e) => { setLastName(e.target.value) }}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    label="Email"
                                    placeholder="Email Address"
                                    value={email}
                                    required={true}
                                    type="email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    errorMessage="We'll never share your email with anyone else."
                                />
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    required={true}
                                    type="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default Signup
