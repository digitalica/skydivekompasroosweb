import React from "react";
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import {withStyles} from "@material-ui/core";

import Header from "./components/header";
import About from "./scenes/about";
import Setfilter from "./scenes/setfilter";
import Setsorting from "./scenes/setsorting";
import Setlanguage from "./scenes/setlanguage";
import Canopy from "./scenes/canopy";
import Main from "./scenes/main";
import Manufacturer from "./scenes/manufacturer";

import KompasroosRoute from "./kompasroosroute";

import C from "./services/kompasroosconstants";

const styles = theme => ({
  row: {
    display: "flex",
  },

  column: {
    flex: "50%",
  }
});


function KompasroosDesktop(props) {
  const {language} = props

  return (
    <BrowserRouter>
      <div>
        <Header
          {...C.withoutClasses(props)}
        />
        <Switch>
          <KompasroosRoute
            exact path={"/" + language + "/"}
            component={Main}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/about" }
            component={About}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setfilter"}
            component={Setfilter}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setsorting"}
            component={Setsorting}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/setlanguage"}
            component={Setlanguage}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/canopy/:slug"}
            component={Canopy}

            {...C.withoutClasses(props)}
          />
          <KompasroosRoute
            path={"/" + language + "/manufacturer/:slug"}
            component={Manufacturer}

            {...C.withoutClasses(props)}
          />
          <Redirect to={"/" + language + "/"} />
        </Switch>
      </div>
    </BrowserRouter>


  );
}

export default withStyles(styles)(KompasroosDesktop);
