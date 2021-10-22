import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container:{
        paddingRight:theme.spacing(1),
        paddingLeft:theme.spacing(1)
    },
    contentWrapper: {
        padding: 30,
        [theme.breakpoints.down('md')]:{
            padding: 8,
        }
    },
    textWrapper: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 4,
        padding:20,
        [theme.breakpoints.down('md')]:{
            padding:8,
        },
        marginBottom: 20,
    }
}));

export default useStyles;