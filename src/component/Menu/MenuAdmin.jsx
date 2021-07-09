import React, { useState, useContext } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText,
    Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../App';
import '../CSS/NavbarComp.css'

function MenuAdmin() {
    const {dispatch } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar className="navbar-dark bg-dark navbar shadow-lg" expand="md">
                <NavbarBrand href="/admin">BERAPI</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/admin" className="nav-link">HOME</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/news/insert" className="nav-link">INSERT NEWS</NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <Button className="btn-danger"
                            onClick={() =>
                                dispatch({
                                    type: "LOGOUT"
                                })}>
                            
                            LOGOUT

                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuAdmin
