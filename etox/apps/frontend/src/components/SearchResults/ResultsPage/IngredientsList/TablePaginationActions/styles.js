import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button:{
      "& :visited": { color: theme.palette.grey[200] },
      "& :hover": { color: theme.palette.primary[300] },
      "& :active": { color: theme.palette.grey[400] },
      color: theme.palette.grey[500]
    }
  }));

export default useStyles;