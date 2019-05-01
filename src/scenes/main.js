import React from "react";
import {withStyles} from "@material-ui/core";

import List from "../components/list";
import SetJumps from "./setjumps";
import C from "../services/kompasroosconstants";


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
  }
});


function Main(props) {

  const {classes} = props;

  if (props.isMobile) {
    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <List {...props}/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <div className={props.classes.row}>
          <div className={props.classes.column}>
            <div className={classes.text}>
              <br/>
              <SetJumps
                {...props}
              />
            </div>
          </div>
          <div className={props.classes.column}>
            <div className={classes.text}>
              <List
                {...props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
