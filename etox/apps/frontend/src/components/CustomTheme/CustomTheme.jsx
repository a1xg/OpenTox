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
            // TODO убрать прозрачность tooltip
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
            textDecoration:'none',
            root: {
                color: theme.palette.grey[700],
                "&:hover": {
                    color: '#62ff3a',
                    textDecoration:'none'
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
            main: '#dbdbdb',
            50: '#f9f9f9',
            100: '#f3f3f3',
            200: '#eaeaea',
            300: '#dbdbdb',
            400: '#b7b7b7',
            500: '#989898',
            600: '#6f6f6f',
            700: '#5c5c5c',
            800: '#3d3d3d',
            900: '#1c1c1c'
        }
    },
    breakpoints: {
        values: {
            lg: 1024,
        },
    }

});

export default customTheme;