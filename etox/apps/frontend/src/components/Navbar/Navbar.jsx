import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import { Paper, Grid } from '@material-ui/core';

const Navbar = (props) => {
    return (
        <Grid container>
            <Grid item>
                <Paper>
                    <NavLink to='/' className={[style.link, style.active, style.hover].join(' ')}>Search main</NavLink>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <NavLink to='/about' className={[style.link, style.active, style.hover].join(' ')}>About</NavLink>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <NavLink to='/how-use' className={[style.link, style.active, style.hover].join(' ')}>How use service</NavLink>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <NavLink to='/search-results' className={[style.link, style.active, style.hover].join(' ')}>search results</NavLink>
                </Paper>
            </Grid>

        </Grid>

    )

};

export default Navbar