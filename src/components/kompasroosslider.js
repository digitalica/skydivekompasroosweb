import React from "react";
import {withStyles} from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from "@material-ui/core/Typography/Typography";
import Slider from '@material-ui/lab/Slider';

import Autotext from "./autotext";

// import C from "./kompasroosconstants";


const styles = theme => ({
  fab: {
    // margin: theme.spacing.unit,
    marginLeft: 0
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  root: {
    paddingTop: 20
  },
  table: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "50px",
    textAlign: "left",
    borderCollapse: "collapse",
  },
  sliderCell: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  nobreak: {
    whiteSpace: "nowrap"
  },
  leftAlign: {},
  rightAlign: {
    textAlign: "right"
  }
});

class KompasroosSlider extends React.Component {

  stepUp = () => {
    let newValue = this.props.value + 1;
    // console.log('step up ' + newValue);
    if (newValue < this.props.min || newValue > this.props.max) {
      return;
    }
    this.props.onChange(null, newValue);
  };


  stepDown = () => {
    let newValue = this.props.value - 1;
    // console.log('step down ' + newValue);
    if (newValue < this.props.min || newValue > this.props.max) {
      return;
    }
    this.props.onChange(null, newValue);
  };


  render() {
    const {classes, value, min, max, labels, labell, onChange, measure} = this.props;

    return (
      <div className={classes.root}>
        <table width="100%" className={classes.table}>
          <tbody>
          <tr>
            <td width="100%">
              <Typography variant="subtitle1"><Autotext short={labels} long={labell}/></Typography>
            </td>
            <td className={classes.nobreak}>
              {value} {measure}
            </td>
          </tr>
          <tr>
            <td colSpan="2" className={classes.sliderCell}>
              <Slider
                classes={{container: classes.slider}}
                value={value}
                aria-labelledby={labels}
                onChange={onChange}
                min={min}
                max={max}
                step={1}
              /></td>
          </tr>
          <tr>
            <td className={classes.leftAlign}>
              <Fab color="primary" aria-label="Sub" className={classes.fab} onClick={this.stepDown}>
                <RemoveIcon/>
              </Fab>
            </td>
            <td className={classes.rightAlign}>
              <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.stepUp}>
                <AddIcon/>
              </Fab>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );

  }

}

export default withStyles(styles)(KompasroosSlider);

