import React from "react";
import {withStyles} from '@material-ui/core/styles';

import Autotext from "./autotext";

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";


const styles = theme => ({
  root: {
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
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
  summarytable: {
    textAlign: "left"
  },
  grey: {
    color: "grey"
  }
});

class Summary extends React.Component {

  render() {
    const {classes, language} = this.props;
    const category = this.props.category;
    const exitWeight = this.props.exitWeight

    let effectiveMinArea = C.effectiveMinAreaBasedOnCategoryAndExitWeight(category, exitWeight);
    let effectiveMinAreaRow = null;
    if (effectiveMinArea) {
      effectiveMinAreaRow = <tr>
        <td><Autotext short={T[language].RESULT_EFFMINAREA_S} long={T[language].RESULT_EFFMINAREA_L}/> {exitWeight} kg:
        </td>
        <td>{effectiveMinArea} sqft</td>
      </tr>
    }

    return (
      <div className={classes.root}>
        {T[language].RESULT_CAT}: {category}<br/>
        <span className={classes.grey}>({T[language]["JUMPERCATEGORIES_"+category]})</span>
        <table className={classes.summarytable}>
          <tbody>
          <tr>
            <td><Autotext short={T[language].RESULT_ALLOWED_S} long={T[language].RESULT_ALLOWED_L}/>:</td>
            <td>{T[language].RESULT_MAXCAT} {category}</td>
          </tr>
          <tr>
            <td><Autotext short={T[language].RESULT_MAXWINGLOAD_S} long={T[language].RESULT_MAXWINGLOAD_L}/>:</td>
            <td>{C.maxWingLoadBasedOnCategoryForDisplay(category, T[language].NOLIMIT)}</td>
          </tr>
          <tr>
            <td><Autotext short={T[language].RESULT_MINAREA_S} long={T[language].RESULT_MINAREA_L}/>:</td>
            <td>{C.minAreaBasedOnCategoryForDisplay(category, T[language].NOLIMIT)}</td>
          </tr>
          {effectiveMinAreaRow}
          </tbody>
        </table>
      </div>
    )

  }

}

export default withStyles(styles)(Summary);

