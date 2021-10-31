import React from "react";
import { makeStyles, alpha } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        maxWidth: 600,
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        margin: theme.spacing(1),
        display: 'flex',
        borderRadius: 4,
        '& .MuiOutlinedInput-root': {
            borderColor: theme.palette.primary[800],
            backgroundColor: theme.palette.grey[50],
            '&:hover fieldset': {
                borderColor: theme.palette.primary[400],
            },
            '&.Mui-focused': {
                backgroundColor: theme.palette.grey[50],
                boxShadow: `${alpha(theme.palette.primary[400], 0.2)} 0 0 0 3px`,
                borderColor: theme.palette.primary[100],
            },
        },
    },
    button: {
        color: theme.palette.grey[500],
        "& :visited": { color: theme.palette.grey[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.grey[400] },

    },

}));

export default useStyles;