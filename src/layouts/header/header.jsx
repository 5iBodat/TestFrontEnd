import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap'
const Header = () => {
    return (
        <>
            <div>
                <Navbar
                    color="light"
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        Sejuta Cita
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck() { }} />
                    <Collapse navbar>
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
                        <NavbarText>
                            Simple Text
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default Header;
