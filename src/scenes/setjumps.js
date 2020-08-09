import React from "react";
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import Summary from "../components/summary";
import Language from "../components/language"
import KompasroosSlider from "../components/kompasroosslider";
import Wingloadtable from "../components/wingloadtable";

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";

const DEBOUNCE_RATE_LIMIT = 250;

const styles = theme => ({
  root: {
    textAlign: "left",
    paddingTop: 64,
    paddingBottom: 150,
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.good[C.BGICONCOLORSHADE]

  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
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
    // console.log('constructor');
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
      <KompasroosSlider
        labels={T[language].SLIDER_JUMPSTOTAL_S}
        labell={T[language].SLIDER_JUMPSTOTAL_L}
        value={this.state.totalJumps}
        min={C.TOTALJUMPS_MIN}
        max={C.TOTALJUMPS_MAX}
        onChange={this.updateTotalJumps}
        measure={T[language].MEASURE_JUMPS}
      />
    );

    let jumpsLast12MonthsSlider = (
      <KompasroosSlider
        labels={T[language].SLIDER_JUMPSLAST12MONTHS_S}
        labell={T[language].SLIDER_JUMPSLAST12MONTHS_L}
        value={this.state.jumpsLast12Months}
        min={C.JUMPSLAST12MONTHS_MIN}
        max={C.JUMPSLAST12MONTHS_MAX}
        onChange={this.updateJumpsLast12Months}
        measure={T[language].MEASURE_JUMPS}
      />
    );

    let xbracedJumpsSlider = null;
    if (C.isCrossBracedRelevant(this.state.totalJumps, this.state.jumpsLast12Months)) {
      xbracedJumpsSlider = (
        <KompasroosSlider
          labels={T[language].SLIDER_JUMPSXBRACED_S}
          labell={T[language].SLIDER_JUMPSXBRACED_L}
          value={this.state.xbracedJumps}
          min={C.JUMPSXBRACED_MIN}
          max={C.JUMPSXBRACED_MAX}
          onChange={this.updateXbracedJumps}
          measure={T[language].MEASURE_JUMPS}
        />
      );
    }

    let languageSelect = null;
    let welcomeText = null;
    let doneButton = null;
    if (showWelcome) {
      languageSelect = (
        <div>
          <Language {...this.props}/>
          <br/>
          <br/>
        </div>
      );
      welcomeText = (
        <div className={classes.welcome}>
          <b>{T[language].EXPERIENCE_WELCOME}</b>
          <br/>
          {T[language].EXPERIENCE_FREE}
        </div>
      );
      doneButton = (
        <div className={classes.text}>
          <Fab variant="extended" color="primary" aria-label="Done" className={classes.fab}
               onClick={this.props.welcomeDone}>
            <DoneAllIcon className={classes.extendedIcon}/>
            {T[language].EXPERIENCE_DONE}
          </Fab>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      );
    }

    let weightSlider = null;
    let wingloadTable = null;
    if (!this.props.isMobile) {
      weightSlider = <KompasroosSlider
        labels={T[language].SLIDER_WEIGHT_S}
        labell={T[language].SLIDER_WEIGHT_L}
        value={this.props.exitWeight}
        min={C.EXITWEIGHT_MIN}
        max={C.EXITWEIGHT_MAX}
        onChange={this.props.updateExitWeight}
        measure={T[language].MEASURE_KG}
      />;
      wingloadTable = <Wingloadtable
        language={language}
        exitWeight={this.props.exitWeight}
        category={this.props.category}
      />;

    }


    return (
      <div className={classes.root}>
        <div className={classes.text}>
          {welcomeText}
          {languageSelect}
          {T[language].EXPERIENCE_INTRO}
        </div>
        {totalJumpsSlider}
        {jumpsLast12MonthsSlider}
        {xbracedJumpsSlider}
        {weightSlider}
        <div className={classes.text}>
          {doneButton}
          {wingloadTable}
          <Summary
            language={language}
            category={this.props.category}
            exitWeight={this.props.exitWeight}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SetJumps);

