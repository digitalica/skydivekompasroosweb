import React from "react";
import {withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import T from "../services/kompasroostranslations";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import C from "../services/kompasroosconstants";
import Radio from "@material-ui/core/Radio/Radio";
import Flag from "react-world-flags";


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
          <Flag code="nl" height="16" width="24"/>
          <Flag code="gb" height="16" width="24"/>
          <Flag code="de" height="16" width="24"/>
          <Flag code="fr" height="16" width="24"/>
        </div>
      </div>
    </FormControl>

  );

}


export default withStyles(styles)(Language);
