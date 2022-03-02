import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledCarousel
} from 'reactstrap'

import './header.css'
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Navbar
                color="transparant"
                expand="md"
                className='mb-3'
                light
            >
                <NavbarBrand href="/">
                    Sejuta Cita
                </NavbarBrand>
                <NavbarToggler onClick={() => {
                    setIsOpen(!isOpen)
                }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <Link to="/bookmark" className='nav-link'>
                                Bookmark
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default Header;
