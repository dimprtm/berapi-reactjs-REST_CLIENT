import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText
} from 'reactstrap';
// import { AuthContext } from '../App';
import { NavLink } from 'react-router-dom';
import '../CSS/NavbarComp.css'

function MenuPublik() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar className="navbar-dark bg-dark navbar shadow-lg" expand="md">
                <NavbarBrand href="/">BERAPI</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>

                        </NavItem>

                    </Nav>
                    <NavbarText>

                        <NavLink to="/login">LOGIN</NavLink>

                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuPublik
