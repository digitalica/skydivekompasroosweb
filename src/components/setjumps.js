import React from "react";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import Summary from "./summary";
import KompasroosSlider from "./kompasroosslider";

import C from "./kompasroosconstants";
import T from "./kompasroostranslations";

const DEBOUNCE_RATE_LIMIT = 250;

const styles = theme => ({
  root: {
    textAlign: "left",
    paddingTop: 64,
    paddingBottom: 150,
  },
  welcome: {
    marginBottom: "25px"
  },
  text: {
    maxWidth: C.MAXWIDTH,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    width: "100%",
    marginLeft: "auto",
    textAlign: "left"
  },
});


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class SetJumps extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    // Don't call this.setState() here!
    this.state = {
      totalJumps: this.props.totalJumps,
      jumpsLast12Months: this.props.jumpsLast12Months,
      xbracedJumps: this.props.xbracedJumps,
    }
  }


  updateTotalJumps = (event, value) => {
    let jumps = {
      totalJumps: value,
    };
    if (value < this.state.jumpsLast12Months) {
      jumps.jumpsLast12Months = value;
    }
    if (value < this.state.xbracedJumps) {
      jumps.xbracedJumps = value;
    }
    this.setState(jumps);
    debounce(this.props.updateJumps, DEBOUNCE_RATE_LIMIT)(jumps);
  };


  updateJumpsLast12Months = (event, value) => {
    let jumps = {
      jumpsLast12Months: value,
    };
    if (value > this.state.totalJumps) {
      jumps.totalJumps = value;
    }
    this.setState(jumps);
    debounce(this.props.updateJumps, DEBOUNCE_RATE_LIMIT)(jumps);
  };

  updateXbracedJumps = (event, value) => {
    let jumps = {
      xbracedJumps: value,
    };
    if (value > this.state.totalJumps) {
      jumps.totalJumps = value;
    }
    this.setState(jumps);
    debounce(this.props.updateJumps, DEBOUNCE_RATE_LIMIT)(jumps);
  };


  render() {
    const {classes, language, showWelcome} = this.props;

    let totalJumpsSlider = (
      <KompasroosSlider label={T[language].SLIDER_JUMPSTOTAL_L} value={this.state.totalJumps} min={C.TOTALJUMPS_MIN}
                        max={C.TOTALJUMPS_MAX}
                        onChange={this.updateTotalJumps}
                        measure={T[language].MEASURE_JUMPS}
      />
    );

    let jumpsLast12MonthsSlider = (
      <KompasroosSlider label={T[language].SLIDER_JUMPSLAST12MONTHS_L} value={this.state.jumpsLast12Months}
                        min={C.JUMPSLAST12MONTHS_MIN} max={C.JUMPSLAST12MONTHS_MAX}
                        onChange={this.updateJumpsLast12Months}
                        measure={T[language].MEASURE_JUMPS}
      />
    );

    let xbracedJumpsSlider = "";
    if (C.isCrossBracedRelevant(this.state.totalJumps, this.state.jumpsLast12Months)) {
      xbracedJumpsSlider = (
        <KompasroosSlider label={T[language].SLIDER_JUMPSXBRACED_L} value={this.state.xbracedJumps}
                          min={C.JUMPSXBRACED_MIN}
                          max={C.JUMPSXBRACED_MAX}
                          onChange={this.updateXbracedJumps}
                          measure={T[language].MEASURE_JUMPS}
        />
      );
    }

    let welcomeText;
    let doneButton = "";
    if (showWelcome) {
      welcomeText = (
        <div className={classes.welcome}>
          <b>{T[language].EXPERIENCE_WELCOME}</b>
          <br/>
          {T[language].EXPERIENCE_FREE}
        </div>
      );
      doneButton = (
        <div className={classes.text}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.props.welcomeDone}>
            {T[language].EXPERIENCE_DONE}
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.text}>
          {welcomeText}
          {T[language].EXPERIENCE_INTRO}
        </div>
        {totalJumpsSlider}
        {jumpsLast12MonthsSlider}
        {xbracedJumpsSlider}
        <Summary
          language={language}
          category={this.props.category}
        />
        {doneButton}
      </div>
    )
  }
}

export default withStyles(styles)(SetJumps);

