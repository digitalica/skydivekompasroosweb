import React from "react";
import {withStyles} from '@material-ui/core/styles';

import Filter from "../components/filter"

import C from "../services/kompasroosconstants";
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
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  row: {
    display: "flex",
  },

  column: {
    flex: "50%",
  },
});

class Setfilter extends React.Component {

  render() {
    const {classes} = this.props;

    if (this.props.isMobile) {
      return (
        <div className={classes.root}>
          <div className={classes.text}>
            <Filter {...this.props}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.root}>

          <div className={this.props.classes.row}>
            <div className={this.props.classes.column}>
              <div className={classes.text}>
                <br/>
                <Filter
                  {...this.props}
                />
              </div>
            </div>
            <div className={this.props.classes.column}>
              <div className={classes.text}>
                <List
                  {...this.props}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

  }

}

export default withStyles(styles)(Setfilter);

