import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import Input from '../components/Input';
import { login } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email, password
        }
        dispatch(login(user));
    }
    let token = window.localStorage.getItem('token');
    if (!token && auth.token) {
        token = auth.token;
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(auth.user));
    }
    if (token) {
        return <Redirect to={'/'} />
    }
    return (
        <div>
            <Layout>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userLogin}>
                                <Input
                                    label="Email"
                                    placeholder="Email Address"
                                    value={email}
                                    required={true}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    errorMessage="We'll never share your email with anyone else."
                                />
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    required={true}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
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

export default Signin
