import Paper from "@material-ui/core/Paper/Paper";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import kompasroosData from "./kompasroosdata";

import C from "./kompasroosconstants";
import T from "./kompasroostranslations";
import Listelement from "./listelement";
import Typography from "@material-ui/core/Typography/Typography";


const styles = theme => ({
  '@global': {
    a: {
      color: "inherit",
      textDecoration: 'none'
    }
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
  table: {
    maxWidth: C.MAXWIDTH,
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto"
  },
  list: {
    padding: 0,
    listStyleType: "none",
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
  }
});

function Manufacturer(props) {
  const {classes, language, slug, category, exitWeight} = props;


  const manufacturer = kompasroosData.manufacturers[kompasroosData.slugs[slug]];
  if (manufacturer) {
    const countries = manufacturer.countrycode.split(/ *, */);
    const country = countries.map((c) => T[language].COUNTRIES[c]).join(', ');

    let remarksRow = "";
    if (manufacturer.remarks && manufacturer.remarks[language]) {
      remarksRow = (
        <tr>
          <td>{T[language].MANUFACTURER_REMARKS}:</td>
          <td>{manufacturer.remarks[language]}</td>
        </tr>
      );
    }

    const orderedCanopies = kompasroosData.canopiesByManufacturer;
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


    return (
      <Paper className={classes.paper}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <table className={classes.table}>
          <tbody>
          <tr>
            <td>{T[language].MANUFACTURER_NAME}:</td>
            <td>{manufacturer.name}</td>
          </tr>
          <tr>
            <td>{T[language].MANUFACTURER_COUNTRY}:</td>
            <td>{country}</td>
          </tr>
          <tr>
            <td></td>
            <td>{manufacturer.url}</td>
          </tr>
          {remarksRow}
          </tbody>
        </table>
        <Typography variant="h6">{T[language].CANOPIESBYTITLE} {manufacturer.name}</Typography>
        <ul className={classes.list}>
          {canopyList}
        </ul>
      </Paper>
    )
  } else {
    return (
      <Paper className={classes.paper}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        manufacturer not found
      </Paper>

    )
  }

}

export default withStyles(styles)(Manufacturer);

