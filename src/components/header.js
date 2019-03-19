import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Link from "@material-ui/core/Link/Link";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import Typography from "@material-ui/core/Typography/Typography";
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from "react";
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';

import Autotext from "./autotext";

import T from "./kompasroostranslations";


const styles = theme => ({
  root: {
    width: '100%',
  },
  link: {
    color: "inherit",
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'none'
    }
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    maxWidth: '400px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class TopAppBar extends React.Component {

  state = {
    anchorEl: null,
    showSearch: false
  };

  openMenu = event => {
    if (!this.props.showWelcome) {
      this.setState({anchorEl: event.currentTarget});
    }
  };

  closeMenu = () => {
    this.setState({anchorEl: null});
  };

  clearSearch = () => {
    // console.log('clear search ' + this.state.showSearch);
    this.props.onSearchChange({target: {value: ""}});
    this.setState({showSearch: false});
  };

  goSearch = () => {
    // console.log('go search ' + this.state.showSearch);
    if (!this.props.showWelcome) {
      this.setState({showSearch: true});
      if (this.props.location.pathname !== "/") {
        this.props.history.push('/');
      }
    }
  };


  goSettings = () => {
    this.closeMenu();
    this.props.history.push('/settings')
  };

  goAbout = () => {
    this.closeMenu();
    this.props.history.push('/about')
  };


  goBack = () => {
    this.props.history.push('/')
  };


  render() {
    const {classes, language} = this.props;
    const {anchorEl} = this.state;


    let topLeftButton;
    // console.log(this.props.location.pathname)
    if (this.props.location.pathname === "/") {
      // console.log('menu');
      topLeftButton =
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.openMenu}>
          <MenuIcon/>
        </IconButton>
    } else {
      // console.log('back');
      topLeftButton =
        <IconButton className={classes.menuButton} color="inherit" aria-label="Back" onClick={this.goBack}>
          <ArrowBackIcon/>
        </IconButton>
    }


    let topRightButton;
    if (this.props.location.pathname === "/" && this.state.showSearch) {
      topRightButton =
        <IconButton
          className={classes.searchButton}
          color="inherit"
          aria-label="Back"
          onClick={this.clearSearch}
        >
          <CancelIcon/>
        </IconButton>
    } else {
      topRightButton =
        <IconButton
          className={classes.searchButton}
          color="inherit"
          aria-label="Back"
          onClick={this.goSearch}
        >
          <SearchIcon/>
        </IconButton>
    }


    let headerCenter;
    if (this.props.location.pathname === "/" && this.state.showSearch) {
      headerCenter = (
        <div className={classes.search}>
          <InputBase
            placeholder={T[language].SEARCH + "..."}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={this.props.searchText}
            onChange={this.props.onSearchChange}
            autoFocus={true}
          />
        </div>
      );
    } else {
      headerCenter = (
        <Link className={classes.link} onClick={this.goBack}>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Autotext short="Kompasroos" long="Skydive Kompasroos"/>
          </Typography>
        </Link>
      )
    }


    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            {topLeftButton}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.goSettings}>
                <ListItemIcon className={classes.icon}>
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.primary}} inset primary={T[language].MENU_SETTINGS}/>
              </MenuItem>
              <MenuItem onClick={this.goAbout}>
                <ListItemIcon className={classes.icon}>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.primary}} inset primary={T[language].MENU_ABOUT}/>
              </MenuItem>
              {/*<MenuItem onClick={this.goAbout}>*/}
              {/*<ListItemIcon className={classes.icon}>*/}
              {/*<HelpIcon/>*/}
              {/*</ListItemIcon>*/}
              {/*<ListItemText classes={{primary: classes.primary}} inset primary={T[language].MENU_HELP}/>*/}
              {/*</MenuItem>*/}
            </Menu>
            <div className={classes.grow}>
              {headerCenter}
            </div>
            <div>
              {topRightButton}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  };

}

export default withRouter(withStyles(styles)(TopAppBar));
