import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        padding: 30,
        [theme.breakpoints.down('md')]:{
            padding: 10,
        }
    },
    textWrapper: {
        //border: `1px solid ${theme.palette.grey[300]}`,
        //borderRadius: 4,
        padding:20,
        marginBottom: 20,
    }
}));

export default useStyles;