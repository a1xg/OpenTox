import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography, capitalize } from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Breadcrumb = (props) => {
    return (
        <Box sx={{padding:10}}>
        <Breadcrumbs 
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small"/>}
        >
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/"
          component={NavLink}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home page
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/search-results"
          component={NavLink}
        >
          <ManageSearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Search results
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <EqualizerIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {props.namePage != null &&
          capitalize(props.namePage.toLowerCase())
          }
        </Typography>
      </Breadcrumbs>
      </Box>
    )
};

export default Breadcrumb;