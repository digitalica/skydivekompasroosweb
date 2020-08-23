import React, {Fragment} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

import TuneIcon from '@material-ui/icons/Tune';

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";
import Autotext from "./autotext";


const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    flexGrow: 1,
  },
  text: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    marginBottom: theme.spacing(2),
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
  singleline: {
    lineHeight: 1
  },
  divider: {
    width: "2px",
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  tuneicon: {
    paddingRight: theme.spacing(2),
  }
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
    if (!this.props.showWelcome) {
      this.props.history.push(this.togglePage('/' + this.props.language + '/setweight'))
    }
  };

  toggleSetJumps = () => {
    if (!this.props.showWelcome) {
      this.props.history.push(this.togglePage('/' + this.props.language + '/setjumps'))
    }
  };


  render() {
    const {classes, language, totalJumps, jumpsLast12Months, xbracedJumps} = this.props;

    let weightText = this.props.exitWeight;
    let jumpsText;
    if (C.isCrossBracedRelevant(this.props.totalJumps, this.props.jumpsLast12Months)) {
      jumpsText =
        <Fragment>
          {totalJumps}<Autotext short="/" long=" / "/>{jumpsLast12Months}<Autotext short="/" long=" / "/>{xbracedJumps}
        </Fragment>
    } else {
      jumpsText =
        <Fragment>
          {totalJumps}<Autotext short="/" long=" / "/>{jumpsLast12Months}
        </Fragment>
    }

    let exitWeightButton = null;
    let experienceButton = null;
    let divider = null;
    if (!this.props.showWelcome) {
      exitWeightButton = <Button className={classes.button} color="inherit"
                                 onClick={this.toggleSetWeight}>
        <table>
          <tbody>
          <tr>
            <td rowSpan="2" className={classes.tuneicon}>
              <TuneIcon fontSize="large"/>
            </td>
            <td>
              <Typography className={classes.singleline} variant="caption"
                          color="inherit">{T[language].EXITWEIGHT}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className={classes.singleline} variant="h6" color="inherit">{weightText}</Typography>
            </td>
          </tr>
          </tbody>
        </table>
      </Button>;
      experienceButton = <Button className={classes.button} color="inherit" onClick={this.toggleSetJumps}>
        <table>
          <tbody>
          <tr>
            <td rowSpan="2" className={classes.tuneicon}>
              <TuneIcon fontSize="large"/>
            </td>
            <td>
              <Typography className={classes.singleline} variant="caption"
                          color="inherit">{T[language].EXPERIENCE}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className={classes.singleline} variant="h6" color="inherit">{jumpsText}</Typography>
            </td>
          </tr>
          </tbody>
        </table>
      </Button>;
      divider = <div className={classes.divider}/>;
    }


    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {exitWeightButton}
          {divider}
          {experienceButton}
        </Toolbar>
      </AppBar>
    )
  }

}

export default withRouter(withStyles(styles)(BottomAppBar));

