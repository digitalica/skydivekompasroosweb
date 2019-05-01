import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from "react";
import {withStyles} from '@material-ui/core/styles';

import Flag from 'react-world-flags';

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";


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
  languageselect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flagcolumn: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
});

class Setlanguage extends React.Component {

  render() {
    const {classes, language} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{T[language].LANGUAGE}</FormLabel>
            <div className={classes.languageselect}>
              <RadioGroup
                aria-label={T[language].LANGUAGE}
                name={T[language].LANGUAGE}
                className={classes.group}
                value={language}
                onChange={this.props.updateLanguage}
              >
                <FormControlLabel value={C.LANGUAGE_NL} control={<Radio/>}
                                  label={T[language].LANGUAGE_DUTCH + " / " + T["nl"].LANGUAGE_DUTCH}/>
                <FormControlLabel value={C.LANGUAGE_EN} control={<Radio/>}
                                  label={T[language].LANGUAGE_ENGLISH + " / " + T["en"].LANGUAGE_ENGLISH}/>
                <FormControlLabel value={C.LANGUAGE_DE} control={<Radio/>}
                                  label={T[language].LANGUAGE_GERMAN + " / " + T["de"].LANGUAGE_GERMAN}/>
                <FormControlLabel value={C.LANGUAGE_FR} control={<Radio/>}
                                  label={T[language].LANGUAGE_FRENCH + " / " + T["fr"].LANGUAGE_FRENCH}/>
              </RadioGroup>
              <div className={classes.flagcolumn}>
                <Flag code="nl" height="16" width="24"/>
                <Flag code="gb" height="16" width="24"/>
                <Flag code="de" height="16" width="24"/>
                <Flag code="fr" height="16" width="24"/>
              </div>
            </div>
          </FormControl>
        </div>
      </div>
    )

  }

}

export default withStyles(styles)(Setlanguage);

