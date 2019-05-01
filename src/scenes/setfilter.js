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
});

class Setfilter extends React.Component {

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
          </FormControl>
        </div>
      </div>
    )

  }

}

export default withStyles(styles)(Setfilter);

