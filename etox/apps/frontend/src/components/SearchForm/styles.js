import React from "react";
import { makeStyles, alpha } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
        width: '600px',
        '& .MuiOutlinedInput-root': {
            overflow: 'hidden',
            borderRadius: 4, //28
            borderColor: theme.palette.primary[800],
            backgroundColor: theme.palette.grey[100],
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            '&:hover fieldset': {
                borderColor: theme.palette.primary[400],
            },
            '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary[100],
            },

        },
    },
    button: {
        color: theme.palette.grey[500],
        "& :visited": { color: theme.palette.grey[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.grey[400] }
        
    }
}));

export default useStyles;