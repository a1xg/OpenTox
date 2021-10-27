import React,{ Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import useStyles from './styles.js';

const ScrollTop = (props) => {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        className={classes.buttonBox}
        sx={{ position: 'fixed', bottom: 50, right: 50 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}
 
const BackToTopButton = (props) => {
    const classes = useStyles();
  return (
    <Fragment>       
      <Toolbar id="back-to-top-anchor" />
      {props.children}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" className={classes.button}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}

export default BackToTopButton;