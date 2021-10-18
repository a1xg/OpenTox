import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        padding: 30
    },
    textWrapper: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 4,
        padding: 15,
        marginTop: 10,
        marginBottom: 20,

    }
}));

export default useStyles;