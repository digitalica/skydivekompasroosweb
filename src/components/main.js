import React from "react";
import {withStyles} from '@material-ui/core/styles';

import List from "./list";
import SetJumps from "./setjumps";

const styles = theme => ({});


class Main extends React.Component {
  render() {
    const {showWelcome} = this.props;

    var main;

    if (showWelcome) {
      main = <SetJumps {...this.props}/>;
    } else {
      main = <List {...this.props}/>;
    }

    return (
      <React.Fragment>
        {main}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);
