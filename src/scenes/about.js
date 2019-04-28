import React from "react";
import {withStyles} from '@material-ui/core/styles';

import C from "../services/kompasroosconstants";

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
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
});

function About(props) {
  const {classes, language} = props;
  switch (language) {
    case "nl":
      return (
        <div className={classes.root}>
          <div className={classes.text}>
            <h3>Over Skydive Kompasroos</h3>
            <p>Skydive Kompasroos is een website om te helpen bij het kiezen van een passende parachute, volgens de
              regels zoals vastgelegd in het <abbr title="Basis Veiligheids Reglement">BVR</abbr> van de afdeling
              parachutespringen van de <abbr
                title="Koninklijke Nederlandse Vereniging voor de Luchtvaart">KNVvL</abbr>.
            </p>

            <p>Vraag altijd ook advies aan een instructeur, hij of zij blijft eindverantwoordelijk. Aan deze website
              kunnen
              geen rechten worden ontleend, de officiële publicaties van de KNVvL zijn:
            </p>

            <p>Voor het BVR en meer informatie:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>De kompasroos zelf:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>BVR Bijlage A, Regels voor Parachutekeuze, versie 2018:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
            </p>

            <p>BVR Bijlage B, Indeling hoofdparachutes, versie februari 2019:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_B_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_B_URL)}</a>
            </p>

            <p>De source is al te vinden op GitHub:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.GITHUB_URL}>{C.filenameFromPath(C.GITHUB_URL)}</a>
            </p>

            <p>De Skydive Kompasroos was oorspronkelijk (tot medio 2015) alleen beschikbaar als Android app. De Android
              versie is inmiddels verouderd en wordt niet meer onderhouden.
              Toen is de eerste website online gekomen op basis van AngularJS.
              Begin 2019 is de overstap naar React gemaakt.</p>

            <p>Robbert Wethmar<br/>
              robbert@digitalica.nl<br/>
              Digitalica, Amsterdam</p>
          </div>
        </div>
      );
    case "en":
      return (
        <div className={classes.root}>
          <div className={classes.text}>
            <h3>About Skydive Kompasroos</h3>
            <p>Skydive Kompasroos (kompasroos is Dutch for compass rose) is a website to help
              choosing a canopy matching your experience, according to the rules set in
              the <abbr title="Basis Veiligheids Reglement">BVR</abbr> (safety regulations) of the parachuting department
              of the <abbr title="Koninklijke Nederlandse Vereniging voor de Luchtvaart">KNVvL</abbr> (Royal Dutch Aviation Society).
            </p>

            <p>Always consult a local instructor. He or she remains responsible. No rights can be obtained from this
              website.
              The official KNVvL documents are:
            </p>

            <p>The BVR and other information:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>The compass rose (kompasroos) itself:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>BVR annex A, Rules for canopy selection, version 2018:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
            </p>

            <p>BVR annex B, main canopy categories, version februari 2019:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.BVR_BIJLAGE_B_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_B_URL)}</a>
            </p>

            <p>The source can be found at GitHub:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.GITHUB_URL}>{C.filenameFromPath(C.GITHUB_URL)}</a>
            </p>

            <p>Originally (until 2015), the Skydive Kompasroos was available as an Android app. The Android version is now
              obsolete and no longer maintained.
              After that the first website was based on AngularJS.
              In 2019 the website was changed to React.
            </p>

            <p>Robbert Wethmar<br/>
              robbert@digitalica.nl<br/>
              Digitalica, Amsterdam</p>
          </div>
        </div>
      );
    default:
      return (
        <div>
          Sorry, unknown language
        </div>
      );
  }
}

export default withStyles(styles)(About);

