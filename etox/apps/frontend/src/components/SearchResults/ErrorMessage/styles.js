import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderTop: `4px solid ${theme.palette.error.light}`,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius:'4px',
        alignItems: 'center',
        width: 600,
        textAlign: 'center',
        padding: '10px'

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