import React from "react";
import {withStyles} from '@material-ui/core/styles';

import List from "./list";

const styles = theme => ({});


class Main extends React.Component {
  render() {
    return <List {...this.props}/>
  }
}

export default withStyles(styles)(Main);
