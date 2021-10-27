import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonBox:{
        position: 'fixed', 
        bottom: 50, 
        right: 50,
        [theme.breakpoints.down('md')]:{
            bottom: 15, 
            right: 15,
        }
    },
    button:{
        color: theme.palette.grey[500],

        "& :visited": { color: theme.palette.grey[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.grey[400] },
    }
}));

export default useStyles;