import React, { useContext } from 'react';
import { AuthContext } from '../App';
import MenuPublik from './Menu/MenuPublik';
import MenuAdmin from './Menu/MenuAdmin';
import './CSS/NavbarComp.css'

function MenuComp() {
    const { state } = useContext(AuthContext)

    if (!state.isAuthenticated) {
        return (
            <MenuPublik/>
        )
    }
    if (state.role === 1){
        return (
            <MenuAdmin/>
        )
    }
    return (
        <MenuPublik/>
    )
}

export default MenuComp
