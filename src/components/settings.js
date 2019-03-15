import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from "react";
import {withStyles} from '@material-ui/core/styles';

import C from "./kompasroosconstants";
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
});

class Settings extends React.Component {

  render() {
    const {classes, language} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{T[language].FILTER}</FormLabel>
            <RadioGroup
              aria-label={T[language].FILTER}
              name={T[language].FILTER}
              className={classes.group}
              value={this.props.filter}
              onChange={this.props.updateFilter}
            >
              <FormControlLabel value={C.FILTER_ALL} control={<Radio/>} label={T[language].FILTER_ALL}/>
              <FormControlLabel value={C.FILTER_COMMON} control={<Radio/>} label={T[language].FILTER_COMMON}/>
              <FormControlLabel value={C.FILTER_AROUND} control={<Radio/>}
                                label={T[language].FILTER_AROUND + ' ' + this.props.category}/>
            </RadioGroup>

            <FormLabel component="legend">{T[language].SORTING}</FormLabel>
            <RadioGroup
              aria-label={T[language].SORTING}
              name={T[language].SORTING}
              className={classes.group}
              value={this.props.sorting}
              onChange={this.props.updateSorting}
            >
              <FormControlLabel value={C.SORTING_NAME} control={<Radio/>} label={T[language].SORTING_NAME}/>
              <FormControlLabel value={C.SORTING_MANUFACTURER} control={<Radio/>}
                                label={T[language].SORTING_MANUFACTURER}/>
              <FormControlLabel value={C.SORTING_CATEGORY} control={<Radio/>} label={T[language].SORTING_CATEGORY}/>
            </RadioGroup>

            <FormLabel component="legend">{T[language].LANGUAGE}</FormLabel>
            <RadioGroup
              aria-label={T[language].LANGUAGE}
              name={T[language].LANGUAGE}
              className={classes.group}
              value={language}
              onChange={this.props.updateLanguage}
            >
              <FormControlLabel value={C.LANGUAGE_NL} control={<Radio/>} label={T[language].LANGUAGE_DUTCH}/>
              <FormControlLabel value={C.LANGUAGE_EN} control={<Radio/>} label={T[language].LANGUAGE_ENGLISH}/>
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    )

  }

}

export default withStyles(styles)(Settings);

