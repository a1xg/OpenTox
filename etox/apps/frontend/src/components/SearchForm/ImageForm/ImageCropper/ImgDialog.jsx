import React, { useState } from 'react';
import { makeStyles,Dialog,AppBar,Toolbar,IconButton,Typography,Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Transition(props) {
  return <Slide direction="up" {...props} />
};

const ImgDialog = (props) => {
  const classes = useStyles();
  
  const [state, setState] = useState({ open: false });
  const handleClickOpen = () => {
    setState({ open: true })
  };
  const handleClose = () => {
    setState({ open: false })
  };
  

  return (
    <Dialog
      fullScreen
      open={!!props.img}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={props.onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
          >
            Cropped image
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.imgContainer}>
        <img src={props.img} alt="Cropped" className={classes.img} />
      </div>
    </Dialog>
  )
};

export default ImgDialog;
