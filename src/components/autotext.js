import React, {Fragment} from "react";
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  long: {
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  },
  short: {
    [theme.breakpoints.up('sm')]: {
      display: "none"
    }
  }
});

function Autotext(props) {
  const {classes, long, short} = props;

  return (
    <Fragment>
      <span className={classes.long}>{long}</span>
      <span className={classes.short}>{short}</span>
    </Fragment>
  );

}


export default withStyles(styles)(Autotext);
