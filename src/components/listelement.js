import React from "react";
import {Link} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'; // checkmark
import GoodIcon from '@material-ui/icons/Done'; // checkmark
import BadIcon from '@material-ui/icons/Clear'; // cross
import WarnIcon from '@material-ui/icons/CropSquare'; // block
import Typography from "@material-ui/core/Typography/Typography";

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";

const styles = theme => ({
  canopydetails: {
    textAlign: "left",
    width: "100%"
  },
  canopycategory: {
    paddingLeft: "8px",
    paddingRight: "6px"
  },
  good: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.good[C.BGCOLORSHADE]
  },
  warn: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.warn[C.BGCOLORSHADE]
  },
  bad: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.bad[C.BGCOLORSHADE]
  },
  goodIcon: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.good[C.BGICONCOLORSHADE]
  },
  warnIcon: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.warn[C.BGICONCOLORSHADE]
  },
  badIcon: { // TODO: remove duplicate with wingloadtable.js
    backgroundColor: theme.palette.bad[C.BGICONCOLORSHADE]
  },
  grey: {
    color: "grey"
  }
});


class ListElement extends React.Component {

  getClass(acceptability) {
    let classAcceptability = '';
    switch (acceptability) {
      case C.ACC_ACCEPTABLE:
        classAcceptability = "good";
        break;
      case C.ACC_NEEDEDSIZENOTAVAILABLE:
        classAcceptability = "warn";
        break;
      case C.ACC_CATEGORYTOOHIGH:
        classAcceptability = "bad";
        break;
      default:
        classAcceptability = ""; // this should not happen
        break;
    }
    // console.log('getclass: ' + acceptability + ' ' + classAcceptability);
    return classAcceptability;
  }

  getClassIcon(acceptability) {
    let classAcceptability = '';
    switch (acceptability) {
      case C.ACC_ACCEPTABLE:
        classAcceptability = "goodIcon";
        break;
      case C.ACC_NEEDEDSIZENOTAVAILABLE:
        classAcceptability = "warnIcon";
        break;
      case C.ACC_CATEGORYTOOHIGH:
        classAcceptability = "badIcon";
        break;
      default:
        classAcceptability = ""; // this should not happen
        break;
    }
    // console.log('getclass: ' + acceptability + ' ' + classAcceptability);
    return classAcceptability;
  }


  getIcon(acceptability) {
    let iconAcceptability = '';
    switch (acceptability) {
      case C.ACC_ACCEPTABLE:
        iconAcceptability = (<GoodIcon/>);
        break;
      case C.ACC_NEEDEDSIZENOTAVAILABLE:
        iconAcceptability = (<WarnIcon/>);
        break;
      case C.ACC_CATEGORYTOOHIGH:
        iconAcceptability = (<BadIcon/>);
        break;
      default:
        iconAcceptability = ""; // this should not happen
        break;
    }
    // console.log('geticon: ' + acceptability + ' ' + iconAcceptability);
    return iconAcceptability;
  }


  render() {
    const {classes, canopy, category, language, exitWeight} = this.props;

    // calculate acceptability
    let acceptability = C.acceptability(canopy, category, exitWeight);
    let classAcceptability = this.getClass(acceptability);
    let classAcceptabilityIcon = this.getClassIcon(acceptability);
    let iconAcceptability = this.getIcon(acceptability);

    let element;
    // console.log('id: ' + canopy.id);

    switch (this.props.sorting) {
      case C.SORTING_MANUFACTURER:
        let line2 = "";

        if (canopy.cells) {
          line2 += canopy.cells + " " + T[language].CANOPY_CELLS;
        }
        if (canopy.minsize && canopy.maxsize) {
          if (line2) {
            line2 += ", ";
          }
          line2 += canopy.minsize + " - " + canopy.maxsize + " sqft";
        }
        if (!line2) {
          line2 = "-"; // dash for now
        }

        element = (
          <li className={classes[classAcceptability]}>
            <Link to={'/' + language + '/canopy/' + canopy.slug}>
              <table>
                <tbody>
                <tr>
                  <td className={classes[classAcceptabilityIcon]}>
                    {iconAcceptability}
                  </td>
                  <td className={classes.canopycategory}>
                    <Typography variant="h6">{canopy.displaycategory}</Typography>
                  </td>
                  <td className={classes.canopydetails}>
                    {canopy.name} <br/>
                    <span className={classes.grey}>{line2}</span>
                  </td>
                  <td>
                    <ArrowIcon/>
                  </td>
                </tr>
                </tbody>
              </table>
            </Link>
          </li>
        );
        break;
      case C.SORTING_CATEGORY:
        element = (
          <li className={classes[classAcceptability]}>
            <Link to={'/' + language + '/canopy/' + canopy.slug}>
              <table>
                <tbody>
                <tr>
                  <td className={classes[classAcceptabilityIcon]}>
                    {iconAcceptability}
                  </td>
                  <td className={classes.canopycategory}>
                    <Typography variant="h6">{canopy.displaycategory}</Typography>
                  </td>
                  <td className={classes.canopydetails}>
                    {canopy.name}<br/>
                    <span className={classes.grey}>{canopy.manufacturername}</span>
                  </td>
                  <td>
                    <ArrowIcon/>
                  </td>
                </tr>
                </tbody>
              </table>
            </Link>
          </li>
        );
        break;
      case C.SORTING_NAME:
      default:
        element = (
          <li className={classes[classAcceptability]}>
            <Link to={'/' + language + '/canopy/' + canopy.slug}>
              <table>
                <tbody>
                <tr>
                  <td className={classes[classAcceptabilityIcon]}>
                    {iconAcceptability}
                  </td>
                  <td className={classes.canopycategory}>
                    <Typography variant="h6">{canopy.displaycategory}</Typography>
                  </td>
                  <td className={classes.canopydetails}>
                    {canopy.name}<br/>
                    <span className={classes.grey}>{canopy.manufacturername}</span>
                  </td>
                  <td>
                    <ArrowIcon/>
                  </td>
                </tr>
                </tbody>
              </table>
            </Link>
          </li>
        );
        break;
    }
    return element;

  }


}


export default withStyles(styles)(ListElement);
