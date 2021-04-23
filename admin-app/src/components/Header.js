import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../actions/auth.actions';

const Header = () => {
    const token = window.localStorage.getItem('token');
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    const LoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout} style={{cursor:'pointer'}}>Signout</span>
                </li>
            </Nav >);
    }

    const NonLoggedInLinks = () => {
        return (
            <Nav>
                < li className="nav-item" >
                    <NavLink to="/signin" className="nav-link" >Login</NavLink>
                </li >
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link" >Signup</NavLink>
                </li>
            </Nav >
        );
    }

    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
                <Container fluid fixed="top">
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        {(token) ? LoggedInLinks() : NonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default Header
