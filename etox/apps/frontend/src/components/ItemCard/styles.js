import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        borderTop: `5px solid ${theme.palette.grey[400]}`,
        "&:hover": {
            borderTop: `5px solid ${theme.palette.primary[200]}`
        },
        backgroundColor: theme.palette.grey[50],
        width:'100%',
        height:'100%',
    },
    cardcontent: {
        padding: '20px',
        [theme.breakpoints.down('md')]:{
            padding: '5px',
        },
        'flex-grow': 1
    },
    caption: {
        color: theme.palette.grey[500],
    },
    title: {
        color: theme.palette.grey[800],
    }

}));

export default useStyles;