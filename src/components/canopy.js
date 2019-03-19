import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

import GoodIcon from '@material-ui/icons/Done'; // checkmark
import BadIcon from '@material-ui/icons/Clear'; // cross
import WarnIcon from '@material-ui/icons/CropSquare'; // block
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'; // checkmark
import OpenInNewIcon from '@material-ui/icons/OpenInNew'; // checkmark
import LinkIcon from '@material-ui/icons/Link';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import Bookmark from '@material-ui/icons/Bookmark';

import Typography from '@material-ui/core/Typography/Typography'

import kompasroosData from "./kompasroosdata";

import C from "./kompasroosconstants"
import T from "./kompasroostranslations";

const styles = theme => ({
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
  canopydetails: {
    textAlign: "left",
    width: "100%",
  },
  canopycategory: {
    whiteSpace: "nowrap",
    paddingLeft: "8px",
    paddingRight: "6px",
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  linkrow: {
    verticalAlign: "middle",
    backgroundColor: "lightgrey",
    height: "40px",
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
  }
});

function getClass(acceptability) {
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


function getClassIcon(acceptability) {
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


function getIcon(acceptability) {
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


function openBlank(url) {
  window.open(url, '_blank');
}

function Canopy(props) {
  const {classes, language, slug, category, exitWeight} = props;
  console.log(JSON.stringify(props));

  const canopy = kompasroosData.canopies[kompasroosData.slugs[slug]];

  let canopyCellsRow = null;
  if (canopy.cells) {
    canopyCellsRow = (
      <tr>
        <td className={classes.canopycategory}>{T[language].CANOPY_CELLS}:</td>
        <td className={classes.canopydetails}>{canopy.cells}</td>
        <td></td>
      </tr>
    );
  }

  let firstyearofproductionRow = null;
  if (canopy.firstyearofproduction) {
    firstyearofproductionRow = (
      <tr>
        <td className={classes.canopycategory}>{T[language].CANOPY_FIRSTYEAR_L}:</td>
        <td className={classes.canopydetails}>{canopy.firstyearofproduction}</td>
        <td></td>
      </tr>
    );
  }

  let lastyearofproductionRow = null;
  if (canopy.lastyearofproduction) {
    lastyearofproductionRow = (
      <tr>
        <td className={classes.canopycategory}>{T[language].CANOPY_LASTYEAR_L}:</td>
        <td className={classes.canopydetails}>{canopy.lastyearofproduction}</td>
        <td></td>
      </tr>
    );
  }

  let remarksRow = null;
  if (canopy.remarks && canopy.remarks[language]) {
    remarksRow = (
      <tr>
        <td className={classes.canopycategory}>{T[language].CANOPY_REMARKS}:</td>
        <td className={classes.canopydetails}>{canopy.remarks[language]}</td>
        <td></td>
      </tr>
    );
  }

  let acceptability = C.acceptability(canopy, category, exitWeight);
  let classAcceptability = getClass(acceptability);
  let classAcceptabilityIcon = getClassIcon(acceptability);
  let iconAcceptability = getIcon(acceptability);

  let sizeRow = null;
  let minsizeRow = null;
  let maxsizeRow = null;
  let wingloadWarningRow = null;

  if (acceptability === C.ACC_NEEDEDSIZENOTAVAILABLE) {
    wingloadWarningRow = (
      <tr className={classes[classAcceptability]}>
        <td className={classes.canopycategory}>{T[language].CANOPY_BEWARE}:</td>
        <td className={classes.canopydetails}>{T[language].CANOPY_WINGLOADWARNING}</td>
        <td></td>
      </tr>
    );
  }

  if (canopy.minsize && canopy.minsize === canopy.maxsize) {
    // minsize en maxsize zijn gelijk
    sizeRow = (
      <tr>
        <td className={classes.canopycategory}>{T[language].CANOPY_SIZE_L}:</td>
        <td className={classes.canopydetails}>{canopy.minsize}</td>
        <td></td>
      </tr>
    );

  } else {
    // minsize en maxsize zijn verschillend
    if (canopy.minsize) {
      minsizeRow = (
        <tr>
          <td className={classes.canopycategory}>{T[language].CANOPY_MINSIZE_L}:</td>
          <td className={classes.canopydetails}>{canopy.minsize}</td>
          <td></td>
        </tr>
      );
    }

    if (canopy.minsize) {
      maxsizeRow = (
        <tr>
          <td className={classes.canopycategory}>{T[language].CANOPY_MAXSIZE_L}:</td>
          <td className={classes.canopydetails}>{canopy.maxsize}</td>
          <td></td>
        </tr>
      );
    }
  }

  let canopyLinkRow = null;
  if (canopy.url) {
    canopyLinkRow = (
      <tr className={classes.linkrow}
          onClick={() => openBlank(canopy.url)}>
        <td><LinkIcon/></td>
        <td className={classes.canopydetails}>{canopy.name}</td>
        <td><OpenInNewIcon/></td>
      </tr>
    );
  }


  let manufacturerLinkRow = null;
  if (canopy.manufacturerurl) {
    manufacturerLinkRow = (
      <tr className={classes.linkrow}
          onClick={() => openBlank(canopy.manufacturerurl)}>
        <td><LinkIcon/></td>
        <td className={classes.canopydetails}>{canopy.manufacturername}</td>
        <td><OpenInNewIcon/></td>
      </tr>
    );
  }

  let linkRows = [];
  if (canopy.links) {
    for (let li = 0; li < canopy.links.length; li++) {
      let link = canopy.links[li];
      let url = link.url;
      let icon = <LinkIcon/>;
      let name = '';
      switch (link.type) {
        case 'dropzone.com':
          icon = <Bookmark/>;
          name = "Dropzone.com";
          break;
        case 'youtube':
          icon = <PlayIcon/>;
          name = "Youtube: " + link.title;
          break;
        case 'vimeo':
          icon = <PlayIcon/>;
          name = "Vimeo: " + link.title;
          break;
        case 'skydivemag':
          icon = <Bookmark/>;
          name = "Skydive Magazine: " + link.title;
          break;
        case 'pdf':
          icon = <PdfIcon/>;
          name = "PDF";
          break;
      }
      linkRows.push(
        <tr className={classes.linkrow}
            onClick={() => openBlank(link.url)}>
          <td>{icon}</td>
          <td className={classes.canopydetails}>{name}</td>
          <td><OpenInNewIcon/></td>
        </tr>
      );
    }

  }


  console.log('canopy: ' + acceptability + ' ' + classAcceptability);

  if (canopy) {
    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <div className={classes[classAcceptability]}>
            <table className={classes.table}>
              <tbody>
              <tr>
                <td className={classes[classAcceptabilityIcon]}>
                  {iconAcceptability}
                </td>
                <td className={classes.canopydetails}>
                  <Typography variant="h6" gutterBottom>
                    {canopy.name}
                  </Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <table className={classes.table}>
            <tbody>
            {wingloadWarningRow}
            <tr className={classes.linkrow}
                onClick={() => props.history.push("/manufacturer/" + canopy.manufacturerslug)}>
              <td className={classes.canopycategory}>{T[language].CANOPY_MANUFACTURER}:</td>
              <td className={classes.canopydetails}>
                {canopy.manufacturername}
              </td>
              <td>
                <ArrowIcon/>
              </td>

            </tr>
            <tr>
              <td className={classes.canopycategory}>{T[language].CANOPY_CATEGORY}:</td>
              <td className={classes.canopydetails}>
                {canopy.category ? canopy.category : T[language].CANOPY_NOTCATEGORIZEDYET + canopy.calculationcategory}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className={classes.canopycategory}>{T[language].CANOPY_EXPERIENCENEEDED_L}:</td>
              <td className={classes.canopydetails}>{T[language].EXPERIENCE_NEEDED[canopy.calculationcategory]}</td>
              <td></td>
            </tr>
            {canopyCellsRow}
            {firstyearofproductionRow}
            {lastyearofproductionRow}
            {sizeRow}
            {minsizeRow}
            {maxsizeRow}
            {remarksRow}
            {canopyLinkRow}
            {manufacturerLinkRow}
            {linkRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        Canopy not found
      </div>
    )
  }

}

export default withRouter(withStyles(styles)(Canopy));

