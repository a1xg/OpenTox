import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
          margin: 0,
        }
      },
    appContainer: {
        backgroundColor: theme.palette.grey[100],
        minHeight: '100vh',
        display: 'flex',
        flex: '1', 
        paddingLeft:0,
        paddingRight:0
      },
      headerWrapper:{
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1)
      },
      searchWrapper:{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      contentWrapper:{ 
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      footerWrapper:{ 
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },

}));

export default useStyles;