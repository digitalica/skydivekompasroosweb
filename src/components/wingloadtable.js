import React from "react";
import {withStyles} from '@material-ui/core/styles';

import C from "./kompasroosconstants";
import T from "./kompasroostranslations";

const styles = theme => ({
  root: {
    textAlign: "left"
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  good: {
    backgroundColor: theme.palette.good[C.BGCOLORSHADE]
  },
  warn: {
    backgroundColor: theme.palette.warn[C.BGCOLORSHADE]
  },
  bad: {
    backgroundColor: theme.palette.bad[C.BGCOLORSHADE]
  },
  center: {
    display: "table",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

//console.log(JSON.stringify(theme.palette.good));

class Wingloadtable extends React.Component {

  getClassArea(isAreaOk, isLoadOk) {
    // console.log('getclassarea');
    if (!isAreaOk) {
      return "bad";
    } else if (isLoadOk) {
      return "good"
    } else {
      return "warn"
    }
  }

  getClassLoad(isAreaOk, isLoadOk) {
    // console.log('getclassload');
    if (!isLoadOk) {
      return "bad";
    } else if (isAreaOk) {
      return "good"
    } else {
      return "warn"
    }
  }

  render() {
    const {classes, language} = this.props;
    const category = this.props.category;
    let headerRow = [];
    let valueRow = [];
    const wingLoadAreas = [120, 135, 150, 170, 190, 210, 260, 285];

    let minArea = C.MINAREA[category];
    let maxLoad = C.MAXWINGLOAD[category];
    // console.log(category + ' ' + minArea + ' ' + maxLoad);
    let weightInLbs = C.kgToLbs(this.props.exitWeight);

    for (let index in wingLoadAreas) {
      let areaValue = wingLoadAreas[index];
      let wingload = C.getWingloadFor(areaValue, weightInLbs);
      let isAreaOk = areaValue >= minArea;
      let isLoadOk = maxLoad === 0 || maxLoad >= wingload;

      console.log('wl ' + areaValue + '  ' + this.props.exitWeight + ' ' + weightInLbs + ' ' + wingload + ' ' + isAreaOk + isLoadOk);
      headerRow.push(
        <td key={areaValue} className={classes[this.getClassArea(isAreaOk, isLoadOk)]}>
          {areaValue}
        </td>
      );
      valueRow.push(
        <td key={areaValue} className={classes[this.getClassLoad(isAreaOk, isLoadOk)]}>
          {wingload}
        </td>
      );
    }


    return (
      <div className={classes.root}>
        <div className={classes.center}>
          {T[language].TABLE_WINGLOADTITLE}<br/>
          <table>
            <tbody>
            <tr>
              {headerRow}
            </tr>
            <tr>
              {valueRow}
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )

  }

}

export default withStyles(styles)(Wingloadtable);

