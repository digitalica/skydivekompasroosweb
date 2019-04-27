import React from "react";
import {withStyles} from "@material-ui/core";

import List from "./list";
import SetJumps from "./setjumps";


const styles = theme => ({
  row: {
    display: "flex",
  },

  column: {
    flex: "50%",
  }
});


function Desktop(props) {

  return (
    <div className={props.classes.row}>
      <div className={props.classes.column}>
        <br/>
        <SetJumps
          {...props}
        />
      </div>
      <div className={props.classes.column}>
        <List
          {...props}
        />

      </div>
    </div>
  );
}

export default withStyles(styles)(Desktop);
