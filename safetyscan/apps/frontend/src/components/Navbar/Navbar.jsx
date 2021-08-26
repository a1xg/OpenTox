import React from 'react';
import { NavLink } from 'react-router-dom'
import style from '../style.module.css'

const Navbar = (props) => {
    return (
        <nav className={style['navbar']}>
            <div>
                <NavLink to='/'>Search main</NavLink>
            </div>
            <div>
                <NavLink to='/about'>About</NavLink>
            </div>
            <div>
                <NavLink to='/how-use'>How use service</NavLink>
            </div>
        </nav>
        
    )

};

export default Navbar