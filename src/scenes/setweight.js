import React from "react";
import {withStyles} from '@material-ui/core/styles';

import KompasroosSlider from "../components/kompasroosslider";
import Wingloadtable from "../components/wingloadtable";
import Summary from "../components/summary";

import C from "../services/kompasroosconstants";
import T from "../services/kompasroostranslations";
import { Helmet } from "react-helmet";

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
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});


class SetWeight extends React.Component {
  render() {
    const {classes, language, isMobile} = this.props;
    let helmet = null
    if (isMobile) {
      helmet = <Helmet>
        <title>{T[language].EXITWEIGHT} - Skydive Kompasroos</title>
      </Helmet>
    }
    return (
      <div className={classes.root}>
        {helmet}
        <div className={classes.text}>
          {T[language].WEIGHT_INTRO}
        </div>
        <KompasroosSlider
          labels={T[language].SLIDER_WEIGHT_S}
          labell={T[language].SLIDER_WEIGHT_L}
          value={this.props.exitWeight}
          min={C.EXITWEIGHT_MIN}
          max={C.EXITWEIGHT_MAX}
          onChange={this.props.updateExitWeight}
          measure={T[language].MEASURE_KG}
        />
        <div className={classes.text}>
          <Wingloadtable
            language={language}
            exitWeight={this.props.exitWeight}
            category={this.props.category}
          />
          <br/>
          <br/>
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

export default withStyles(styles)(SetWeight);

