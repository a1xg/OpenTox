import React from 'react';
import { createTheme } from '@material-ui/core';

//* Default theme https://mui.com/customization/default-theme/

/**
 * default theme
 */
const theme = createTheme({
})

const customTheme = createTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: 12,
                fontFamily: 'sans-serif',
                color: theme.palette.grey[900],
                backgroundColor: theme.palette.grey[50],
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                overflow: 'hidden'
            },
        },
        MuiLink: {
            //textDecoration:'none',
            root: {
                color: theme.palette.primary.main,
                "&:hover": {
                    color: theme.palette.primary.main,
                    //textDecoration:'none'
                },
                
            },
        },
    },
    palette: {
        primary: {
            main: '#62ff3a',
            50: '#eeffe7',
            100: '#d4ffc4',
            200: '#b4ff9b',
            300: '#8cff6b',
            400: '#62ff3a',
            500: '#1dfc00',
            600: '#00ea00',
            700: '#00d400',
            800: '#00bf00',
            900: '#009a00'
        },
        secondary: {
            main: '#e667fd',
            50: '#fbe7fe',
            100: '#f4c2fd',
            200: '#ee97fe',
            300: '#e667fd',
            400: '#de37fb',
            500: '#d100f2',
            600: '#bf00ec',
            700: '#a700e5',
            800: '#9100df',
            900: '#6604d3'
        }
    },
    breakpoints: {
        values: {
            lg: 1024,
        },
    }
});

export default customTheme;