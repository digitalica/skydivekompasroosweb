import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

import C from "./kompasroosconstants";
import T from "./kompasroostranslations";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class BottomAppBar extends React.Component {

  togglePage = (url) => {
    if (this.props.location.pathname === url) {
      return "/";
    } else {
      return url;
    }
  };


  toggleSetWeight = () => {
    this.props.history.push(this.togglePage('/setweight'))
  };

  toggleSetJumps = () => {
    this.props.history.push(this.togglePage('/setjumps'))
  };


  render() {
    const {classes, language} = this.props;

    let weightText = this.props.exitWeight;
    let jumpsText = this.props.totalJumps + " / " + this.props.jumpsLast12Months;
    if (C.isCrossBracedRelevant(this.props.totalJumps, this.props.jumpsLast12Months)) {
      jumpsText += " / " + this.props.xbracedJumps;
    }

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Button className={classes.button} color="inherit" onClick={this.toggleSetWeight}>
            <table>
              <tbody>
              <tr>
                <td>
                  <Typography variant="caption" color="inherit">{T[language].EXITWEIGHT}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" color="inherit">{weightText}</Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </Button>
          <Button className={classes.button} color="inherit" onClick={this.toggleSetJumps}>
            <table>
              <tbody>
              <tr>
                <td>
                  <Typography variant="caption" color="inherit">{T[language].EXPERIENCE}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" color="inherit">{jumpsText}</Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }

}

export default withRouter(withStyles(styles)(BottomAppBar));

