import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

const Navbar = (props) => {
    return (
        <nav className={s.navbar}>
            <div className={s.row}>
                <NavLink to='/' className={[s.link, s.active, s.hover].join(' ')}>Search main</NavLink>
            </div>
            <div className={s.row}>
                <NavLink to='/about' className={[s.link, s.active, s.hover].join(' ')}>About</NavLink>
            </div>
            <div className={s.row}>
                <NavLink to='/how-use' className={[s.link, s.active, s.hover].join(' ')}>How use service</NavLink>
            </div>
        </nav>
        
    )

};

export default Navbar