import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderTop: `4px solid ${theme.palette.error.light}`,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius:'4px',
        alignItems: 'center',
        maxWidth: 600,
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        textAlign: 'center',
        padding: '10px',
        [theme.breakpoints.down('md')]:{
            width:'calc(100% - 16px)'
        }

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