import React from 'react';
// import PropTypes from 'prop-types'
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Layout.css'


const Layout = props => {
    return (
        <div>
            <Header />
            <div style={{ marginTop: "4rem" }}>
                {
                    props.sidebar ?
                        <Container fluid >
                            <Row>
                                <Col md={2} className="sidebar" style={{ marginRight: 'auto' }}>
                                    <ul>
                                        <li><NavLink exact to={"/"} >Home</NavLink></li>
                                        <li><NavLink to={"/page"} >Page</NavLink></li>
                                        <li><NavLink to={"/categories"}>Categories</NavLink></li>
                                        <li><NavLink to={"/products"}>Products</NavLink></li>
                                        <li><NavLink to={"/orders"}>Orders</NavLink></li>
                                    </ul>
                                </Col>
                                <Col md={10} className="" style={{ marginLeft: 'auto' }}>
                                    {props.children}
                                </Col>
                            </Row>
                        </Container >
                        :
                        props.children

                }
            </div>
        </div >
    )
}

Layout.propTypes = {

}

export default Layout
