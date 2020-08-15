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
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
              <a target="_blank" rel="noopener noreferrer"
                 href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>De kompasroos zelf:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>BVR Bijlage A, Regels voor Parachutekeuze, versie 2018:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
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
              the <abbr title="Basis Veiligheids Reglement">BVR</abbr> (safety regulations) of the parachuting
              department
              of the <abbr title="Koninklijke Nederlandse Vereniging voor de Luchtvaart">KNVvL</abbr> (Royal Dutch
              Aviation Society).
            </p>

            <p>Always consult a local instructor. He or she remains responsible. No rights can be obtained from this
              website.
              The official KNVvL documents are:
            </p>

            <p>The BVR and other information:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>The compass rose (kompasroos) itself:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>BVR annex A, Rules for canopy selection, version 2018:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
            </p>

            <p>BVR annex B, main canopy categories, version februari 2019:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_B_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_B_URL)}</a>
            </p>

            <p>The source can be found at GitHub:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.GITHUB_URL}>{C.filenameFromPath(C.GITHUB_URL)}</a>
            </p>

            <p>Originally (until 2015), the Skydive Kompasroos was available as an Android app. The Android version is
              now
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
    case "de":
      return (
        <div className={classes.root}>
          <div className={classes.text}>
            <h3>Über Skydive Kompasroos</h3>
            <p>Die Website Skydive Kompasroos ("kompasroos" ist das holländische Wort für "Kompass-Rose") hilft dir bei
              der Auswahl
              eines Fallschirmes, welcher für deinen Erfahrungsstand geeignet ist. Die angezeigten Resultate
              entsprechenden
              Richtlinien der <abbr title="Koninklijke Nederlandse Vereniging voor de Luchtvaart">KNVvL</abbr> (Royal
              Dutch
              Aviation Society, <abbr title="Basis Veiligheids Reglement">BVR</abbr> safety regulations) und sind für
              Holland
              verbindlich. Für andere Länder und/oder Organisationen können sie als Empfehlungen angesehen werden.</p>

            <p>Hole dir zusätzliche Beratung bei einem Instruktor! Die Informationen von Skydive Kompasroos sind nicht
              als
              alleiniges Hilfsmittel für eine Entscheidung gedacht, da nicht alle denkbaren Situationen abgedeckt sind!
              Skydive Kompasroos lehnt jegliche Haftung ab.</p>

            <p>Den angezeigten Resultaten liegen folgende Dokumente der KNVvL zu Grunde:</p>

            <p>Die BVR (safety regulations) und weitere Informationen:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>Die "kompasroos":<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>BVR Anhang A, Regeln für Schirm-Auswahl, Version 2018:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
            </p>

            <p>BVR Anhang B, Hauptschirm-Kategorien, Version Februar 2019:<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_B_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_B_URL)}</a>
            </p>

            <p>Der Quellcode von https://skydivekompasroos.nl auf GitHub:<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.GITHUB_URL}>{C.filenameFromPath(C.GITHUB_URL)}</a>
            </p>

            <p>Bis 2015 war "Skydive Kompasroos" eine Android-App. Die Android-Version ist veraltet und wird nicht mehr
              unterstützt oder aktualisiert. Seit 2016 war "Skydive Kompasroos" eine Website basierend auf AngularJS.
              Seit 2019 wurde die Website umgebaut auf ReactJS und läuft in allen modernen Browsern (Mobile /
              Desktop).</p>

            <p>Robbert Wethmar<br/>
              robbert@digitalica.nl<br/>
              Digitalica, Amsterdam</p>
          </div>
        </div>
      );
    case "fr":
      return (
        <div className={classes.root}>
          <div className={classes.text}>
            <h3>A propos de Skydive Kompasroos</h3>

            <p>Skydive Kompasroos (Kompasroos signifie "rose des vents" en hollandais) est un site internet destiné à
              t'aider à choisir un parachute correspondant à ton expérience, selon les règles de sécurité définies par
              la <abbr title="Koninklijke Nederlandse Vereniging voor de Luchtvaart">KNVVL</abbr> (Société d'aviation
              royale hollandaise).</p>

            <p>Demande toujours conseil à un(e) instructeur(trice). Il ou elle reste responsable de toi. Ce site
              internet ne te donne aucun droits. Les documents officiels de la KNVVL sont :</p>

            <p>Les règles de sécurité et autres informations :<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.REGLEMENTEN_URL}>{C.filenameFromPath(C.REGLEMENTEN_URL)}</a>
            </p>

            <p>La rose des vents (Kompasroos) elle-même :<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.KOMPASROOS_URL}>{C.filenameFromPath(C.KOMPASROOS_URL)}</a>
            </p>

            <p>Règles de sécurité annexe A, choisir un parachute, version 2018 :<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_A_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_A_URL)}</a>
            </p>

            <p>Règles de sécurité annexe B, catégories de parachutes principaux, version février 2019 :<br/>
              <a target="_blank" rel="noopener noreferrer"
                 href={C.BVR_BIJLAGE_B_URL}>{C.filenameFromPath(C.BVR_BIJLAGE_B_URL)}</a>
            </p>

            <p>Les sources peuvent être trouvées sur GitHub :<br/>
              <a target="_blank" rel="noopener noreferrer" href={C.GITHUB_URL}>{C.filenameFromPath(C.GITHUB_URL)}</a>
            </p>

            <p>Initialement (jusqu'en 2015), Skydive Kompasroos était disponible comme application Android. Cette
              version Android est dorénavant obsolète et n'est plus mise à jour. Ensuite, le premier site internet a
              été écrit en AngularJS. Depuis 2019, le site à été ré-ecrit en React.</p>

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

