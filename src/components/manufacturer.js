import React from "react";
import {withStyles} from '@material-ui/core/styles';
import kompasroosData from "./kompasroosdata";
import Typography from "@material-ui/core/Typography/Typography";
import GroupIcon from '@material-ui/icons/Group';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'; // checkmark
import LinkIcon from '@material-ui/icons/Link';

import Listelement from "./listelement";

import C from "./kompasroosconstants";
import T from "./kompasroostranslations";


const styles = theme => ({
  '@global': {
    a: {
      color: "inherit",
      textDecoration: 'none'
    }
  },
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
  table: {
    width: "100%",
    maxWidth: C.MAXWIDTH,
    textAlign: "left",
    marginLeft: "0",
    border: "none",
  },
  manufacturerdetails: {
    textAlign: "left",
    width: "100%",
  },
  list: {
    padding: 0,
    listStyleType: "none",
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
  },
  linkrow: {
    verticalAlign: "middle",
    backgroundColor: "lightgrey",
    height: "40px",
  },
  canopylist: {
    paddingTop: "50px"
  }
});


function openBlank(url) {
  window.open(url, '_blank');
}


function Manufacturer(props) {
  const {classes, language, slug, category, exitWeight} = props;


  const manufacturer = kompasroosData.manufacturers[kompasroosData.slugs[slug]];
  if (manufacturer) {
    const countries = manufacturer.countrycode.split(/ *, */);
    const country = countries.map((c) => T[language].COUNTRIES[c]).join(', ');

    let remarksRow = null;
    if (manufacturer.remarks && manufacturer.remarks[language]) {
      remarksRow = (
        <tr>
          <td>{T[language].MANUFACTURER_REMARKS}:</td>
          <td>{manufacturer.remarks[language]}</td>
        </tr>
      );
    }

    const orderedCanopies = kompasroosData.canopiesByCategory;
    let canopyList = [];
    for (let f = 0; f < orderedCanopies.length; f++) {
      let canopy = kompasroosData.canopies[orderedCanopies[f]];
      if (canopy.manufacturerid === manufacturer.id) {
        canopyList.push(
          <Listelement
            key={canopy.id}
            canopy={canopy}
            category={category}
            exitWeigh={exitWeight}
            sorting={C.SORTING_MANUFACTURER}
          />
        );
      }
    }


    let manufacturerLinkRow = null;
    if (manufacturer.url) {
      manufacturerLinkRow = (
        <tr className={classes.linkrow}
            onClick={() => openBlank(manufacturer.url)}>
          <td><LinkIcon/></td>
          <td className={classes.canopydetails}>{manufacturer.name}</td>
          <td><OpenInNewIcon/></td>
        </tr>
      );
    }


    return (
      <div className={classes.root}>

        <div className={classes.text}>
          <div>
            <table className={classes.table}>
              <tbody>
              <tr>
                <td>
                  <GroupIcon/>
                </td>
                <td className={classes.manufacturerdetails}>
                  <Typography variant="h6" gutterBottom>
                    {manufacturer.name}
                  </Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <table className={classes.table}>
            <tbody>
            {manufacturerLinkRow}
            <tr>
              <td>{T[language].MANUFACTURER_COUNTRY}:</td>
              <td>{country}</td>
            </tr>
            {remarksRow}
            </tbody>
          </table>
          <div className={classes.canopylist}>
            <Typography variant="h6">{T[language].CANOPIESBYTITLE} {manufacturer.name}</Typography>
            <ul className={classes.list}>
              {canopyList}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.paper}>
        manufacturer not found
      </div>

    )
  }

}

export default withStyles(styles)(Manufacturer);

