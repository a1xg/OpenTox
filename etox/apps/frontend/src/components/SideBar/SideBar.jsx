import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    IconButton,
    Menu,
    MenuItem,
    MenuList,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import HelpIcon from '@material-ui/icons/Help';
import BuildIcon from '@material-ui/icons/Build';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
});

const menuItems = [
    { text: 'Home page', link: '/', icon: <HomeIcon />},
    { text: 'How use it', link: '/how-use', icon: <HelpIcon />},
    { text: 'How it works', link: '/how-it-works', icon: <BuildIcon /> },
    { text: 'About', link: '/about', icon: <InfoIcon />},
    { text: 'Contacts', link: '/contacts', icon: <MailIcon />},
];

const SideBar = () => {
    const classes = useStyles();
    const [state, setState] = useState({ left: false });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom"
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {menuItems.map(item => {
                    return (
                        <ListItem button key={item.text} component={NavLink} to={item.link}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer("left", true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </div>
    );
};

export default SideBar;