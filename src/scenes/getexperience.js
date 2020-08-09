import React from "react";
import {withStyles} from '@material-ui/core/styles';

import SetJumps from "./setjumps";

const styles = theme => ({});


class GetExperience extends React.Component {
  render() {
    return <SetJumps {...this.props}/>
  }
}

export default withStyles(styles)(GetExperience);
