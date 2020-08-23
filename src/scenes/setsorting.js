import React from "react";
import {Helmet} from "react-helmet";
import {withStyles} from '@material-ui/core/styles';

import Sorting from '../components/sorting';

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";

import List from "../components/list";

const styles = theme => ({
  root: {
    textAlign: "left",
    paddingTop: 64,
    paddingBottom: 150,
  },
  text: {
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  row: {
    display: "flex",
  },
  column: {
    flex: "50%",
  },
});

class Setsorting extends React.Component {

  render() {
    const {language, classes} = this.props;

    if (this.props.isMobile) {
      return (
        <div className={classes.root}>
          <Helmet>
            <title>{T[language].SORTING} - Skydive Kompasroos</title>
          </Helmet>
          <div className={classes.text}>
            <Sorting {...C.withoutClasses(this.props)}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <Helmet>
            <title>{T[language].SORTING} - Skydive Kompasroos</title>
          </Helmet>
          <div className={this.props.classes.row}>
            <div className={this.props.classes.column}>
              <div className={classes.text}>
                <br/>
                <Sorting
                  {...C.withoutClasses(this.props)}
                />
              </div>
            </div>
            <div className={this.props.classes.column}>
              <div className={classes.text}>
                <List
                  {...C.withoutClasses(this.props)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }


  }

}

export default withStyles(styles)(Setsorting);

