import React, {Fragment} from "react";
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  long: {
    "@media (max-width: 480px)": {
      display: "none"
    }
  },
  short: {
    "@media (min-width: 480px)": {
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
