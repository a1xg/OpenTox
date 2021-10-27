import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
            width:600,
            [theme.breakpoints.down('md')]:{
                width:'calc(100% - 8px)'
            },
            paddingRight: '8px', 
            paddingLeft:'8px'
            
       
    },
    box:{
        borderTop: `4px solid ${theme.palette.error.light}`,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius:'4px',
        padding:'10px',
        //width: '100%',

    },
    title: {
        color: theme.palette.error.light,
        textAlign:'left'
    },
    errormessage: {
        color: theme.palette.grey[700]
    }
}));

export default useStyles;