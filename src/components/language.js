import React from "react";
import {withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import T from "../services/kompasroostranslations";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import C from "../services/kompasroosconstants";
import Radio from "@material-ui/core/Radio/Radio";

const styles = theme => ({
  languageselect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flagcolumn: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
});

function Language(props) {
  const {language, classes} = props;

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{T[language].LANGUAGE}</FormLabel>
      <div className={classes.languageselect}>
        <RadioGroup
          aria-label={T[language].LANGUAGE}
          name={T[language].LANGUAGE}
          value={language}
          onChange={props.updateLanguage}
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
          {/* All flags can be found on: https://catamphetamine.gitlab.io/country-flag-icons/3x2/index.html */}
          <img alt="NL" height="16" width="24" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/NL.svg"/>
          <img alt="GB" height="16" width="24" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg"/>
          <img alt="DE" height="16" width="24" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/DE.svg"/>
          <img alt="FR" height="16" width="24" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/FR.svg"/>
        </div>
      </div>
    </FormControl>

  );

}


export default withStyles(styles)(Language);
