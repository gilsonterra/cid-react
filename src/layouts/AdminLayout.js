import React from 'react';
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import Dash from '../pages/Dash';
import Logs from '../pages/Logs';
import LogsServer from '../pages/LogsServer';
import SettingList from '../pages/setting/SettingList';
import UserList from '../pages/user/UserList';
import UrnSearch from '../pages/urn/UrnSearch';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
/*
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ChatIcon from '@material-ui/icons/Chat';
import InfoIcon from '@material-ui/icons/Info';
*/
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import { getUser } from '../helpers/Auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        backgroundColor: '#fff',
        color: '#37474F'        
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#37474F',
        color: '#DDD'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function AdminLayout() {
    let { path } = useRouteMatch();
    const userAuthenticated = getUser();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>            
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{flexGrow: 1}}>CID</Typography>
                    <Typography variant="subtitle1" noWrap style={{marginRight: 10}}>{userAuthenticated ? userAuthenticated.name : ''}</Typography>
                    <Button color="primary" startIcon={<ExitToAppIcon />}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} to={`${path}`}>
                        <ListItemIcon style={{color: '#ccc'}}><DashboardIcon /></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>                    
                    { /*
                    <ListItem button component={Link} to={`${path}`}>
                        <ListItemIcon style={{color: '#ccc'}}><RecordVoiceOverIcon /></ListItemIcon>
                        <ListItemText primary='Calls & Reports' />
                    </ListItem>
                    <ListItem button component={Link} to={`${path}`}>
                        <ListItemIcon style={{color: '#ccc'}}><ChatIcon /></ListItemIcon>
                        <ListItemText primary='Add Record' />
                    </ListItem>
                    <ListItem button component={Link} to={`${path}`}>
                        <ListItemIcon style={{color: '#ccc'}}><InfoIcon /></ListItemIcon>
                        <ListItemText primary='Pending Approval' />
                    </ListItem>
                    */}
                    <ListItem button component={Link} to={`${path}/urn/search`}>
                        <ListItemIcon style={{color: '#ccc'}}><SearchIcon /></ListItemIcon>
                        <ListItemText primary='Search' />
                    </ListItem>                     
                    <ListItem button component={Link} to={`${path}/user/list`}>
                        <ListItemIcon style={{color: '#ccc'}}><PeopleIcon /></ListItemIcon>
                        <ListItemText primary='User Agency' />
                    </ListItem>                   
                    <ListItem button component={Link} to={`${path}/setting/list`}>
                        <ListItemIcon style={{color: '#ccc'}}><SettingsIcon /></ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem>
                    <ListItem button component={Link} to={`${path}/logs`}>
                        <ListItemIcon style={{color: '#ccc'}}><ListIcon /></ListItemIcon>
                        <ListItemText primary='Logs' />
                    </ListItem>
                    <ListItem button component={Link} to={`${path}/logs-server`}>
                        <ListItemIcon style={{color: '#ccc'}}><ListIcon /></ListItemIcon>
                        <ListItemText primary='Logs Serve' />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route exact path={path}>
                        <Dash />
                    </Route>
                    <Route exact path={`${path}/user/list`}>
                        <UserList />
                    </Route>
                    <Route exact path={`${path}/urn/search`}>
                        <UrnSearch />
                    </Route>
                    <Route exact path={`${path}/setting/list`}>
                        <SettingList />
                    </Route>
                    <Route exact path={`${path}/logs`}>
                        <Logs />
                    </Route>
                    <Route exact path={`${path}/logs-server`}>
                        <LogsServer />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}
